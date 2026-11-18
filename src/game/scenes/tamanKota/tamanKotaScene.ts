import {
  TransformNode,
  MeshBuilder,
  StandardMaterial,
  Color3,
  Vector3,
  HemisphericLight,
  DirectionalLight,
  FreeCamera,
  Scene,
  type Mesh,
} from "@babylonjs/core";
import type { MissionModule, MissionContext, TrashItemData } from "../../engine/types";
import { TAMAN_KOTA_CONFIG } from "../../data/tamanKotaConfig";
import { TAMAN_KOTA_TUTORIAL } from "../../data/tamanKotaScript";
import { PlayerEntity } from "../../entities/player";
import { EcobotEntity } from "../../entities/ecobot";
import { TrashBinsSystem } from "../../entities/trashBins";
import { TrashSpawner } from "../../systems/TrashSpawner";
import { Inventory } from "../../systems/Inventory";
import { InteractionSystem } from "../../systems/InteractionSystem";
import { BinSystem } from "../../systems/BinSystem";
import { AudioFx } from "../../systems/AudioFx";

interface StaticObstacle {
  x: number;
  z: number;
  radius: number;
}

export class TamanKotaScene implements MissionModule {
  public id = "taman-kota";

  private ctx!: MissionContext;
  private scene!: Scene;
  private camera!: FreeCamera;

  // Entities & Systems
  private player!: PlayerEntity;
  private ecobot!: EcobotEntity;
  private binsSystem!: TrashBinsSystem;
  private trashSpawner!: TrashSpawner;
  private inventory!: Inventory;
  private interactionSystem!: InteractionSystem;
  private binSystem!: BinSystem;
  private audio!: AudioFx;

  // Visual World Progress Elements
  private groundMat!: StandardMaterial;
  private hemiLight!: HemisphericLight;
  private dirLight!: DirectionalLight;
  private fountainWaterMesh!: Mesh;
  private flowersRoot!: TransformNode;
  private npcKidsRoot!: TransformNode;
  private obstacles: StaticObstacle[] = [];

  // Tutorial & Gameplay State
  private tutorialStage: "intro" | "walk" | "pickup" | "bin" | "free" = "walk";
  private distanceTraveled = 0;
  private lastPlayerPos = new Vector3(0, 0, -15);
  private missionStartTime = 0;
  private isCompleted = false;
  private idleTimer = 0;

  async buildScene(ctx: MissionContext): Promise<void> {
    this.ctx = ctx;
    this.scene = ctx.scene;

    const reduceMotion = Boolean(ctx.options.settings?.reduceMotion);
    const isMuted = Boolean(ctx.options.settings?.muted);
    const sfxVol = ctx.options.settings?.sfxVolume ?? 80;

    // 1. Audio System
    this.audio = new AudioFx(isMuted, sfxVol);

    // 2. Camera Setup (Third Person Follow)
    this.camera = new FreeCamera("tamanCamera", new Vector3(0, 8, -23), this.scene);
    this.camera.setTarget(new Vector3(0, 1.2, -15));

    // 3. Environment & Lights
    this.setupLightingAndFog();
    this.buildTerrain();
    this.buildFountain();
    this.buildParkProps();

    // 4. Player & Mascot
    this.player = new PlayerEntity(
      this.scene,
      ctx.options.character,
      ctx.options.inventory,
      ctx.options.upgrades,
      reduceMotion
    );

    this.ecobot = new EcobotEntity(this.scene, reduceMotion);
    // Sembunyikan model 3D maskot/hewan agar tidak melayang di dekat pemain (dialog HUD tetap aktif)
    this.ecobot.setVisible(false);

    // 5. Bins System
    this.binsSystem = new TrashBinsSystem(this.scene);
    for (const b of this.binsSystem.bins) {
      this.obstacles.push({ x: b.position.x, z: b.position.z, radius: 0.9 });
    }

    // 6. Trash Spawner
    this.trashSpawner = new TrashSpawner(this.scene, reduceMotion);

    // 7. Inventory & Interaction
    const bagLevel = ctx.options.upgrades?.bag || 1;
    this.inventory = new Inventory(bagLevel, (bagData) => {
      ctx.callbacks.onBagChange?.(bagData);
      this.player.updateCarriedItems(bagData.items.length);
    });

    const hasGrabber = (ctx.options.upgrades?.grabber || 0) > 0;
    this.interactionSystem = new InteractionSystem(hasGrabber, (prompt) => {
      ctx.callbacks.onActionPromptChange?.(prompt);
    });

    // 8. Bin System
    this.binSystem = new BinSystem(ctx.callbacks, this.audio, 8);

    // Initial Welcome Dialog
    const nick = ctx.options.nickname || "Pahlawan Cilik";
    ctx.requestEcobotBubble(
      `Halo, ${nick}! Aku Ecobot. Taman kota ini kotor sekali. Yuk bantu aku membersihkannya!`,
      "happy"
    );
  }

  private setupLightingAndFog() {
    // Hemispheric ambient light (sky/ground)
    this.hemiLight = new HemisphericLight("hemiLight", new Vector3(0, 1, 0), this.scene);
    this.hemiLight.intensity = 0.9;
    this.hemiLight.diffuse = new Color3(0.9, 0.95, 0.85);
    this.hemiLight.groundColor = new Color3(0.3, 0.45, 0.3);

    // Directional sunlight
    this.dirLight = new DirectionalLight("dirLight", new Vector3(-0.5, -1, 0.6), this.scene);
    this.dirLight.intensity = 0.65;
    this.dirLight.diffuse = new Color3(1, 0.98, 0.9);

    // Subtle atmospheric fog (initially slightly dusty/greyish)
    this.scene.fogMode = Scene.FOGMODE_EXP;
    this.scene.fogDensity = 0.008;
    this.scene.fogColor = new Color3(0.72, 0.82, 0.78);
  }

  private buildTerrain() {
    // Ground Grass Plane (40x40 units)
    const ground = MeshBuilder.CreateGround("parkGround", { width: 40, height: 40, subdivisions: 4 }, this.scene);
    this.groundMat = new StandardMaterial("groundMat", this.scene);
    this.groundMat.diffuseColor = new Color3(0.48, 0.65, 0.42); // Initially muted/dusty
    this.groundMat.specularColor = new Color3(0.02, 0.02, 0.02);
    ground.material = this.groundMat;

    // Outer Park Perimeter Fence (low stone border / hedges)
    const borderMat = new StandardMaterial("borderMat", this.scene);
    borderMat.diffuseColor = new Color3(0.35, 0.42, 0.32);

    const fenceNorth = MeshBuilder.CreateBox("fenceN", { width: 40, height: 1.0, depth: 0.8 }, this.scene);
    fenceNorth.position = new Vector3(0, 0.5, 19.6);
    fenceNorth.material = borderMat;

    const fenceSouth = MeshBuilder.CreateBox("fenceS", { width: 40, height: 1.0, depth: 0.8 }, this.scene);
    fenceSouth.position = new Vector3(0, 0.5, -19.6);
    fenceSouth.material = borderMat;

    const fenceEast = MeshBuilder.CreateBox("fenceE", { width: 0.8, height: 1.0, depth: 40 }, this.scene);
    fenceEast.position = new Vector3(19.6, 0.5, 0);
    fenceEast.material = borderMat;

    const fenceWest = MeshBuilder.CreateBox("fenceW", { width: 0.8, height: 1.0, depth: 40 }, this.scene);
    fenceWest.position = new Vector3(-19.6, 0.5, 0);
    fenceWest.material = borderMat;

    // Circular Paved Walkway around park & central plaza
    const pathMat = new StandardMaterial("pathMat", this.scene);
    pathMat.diffuseColor = new Color3(0.78, 0.78, 0.76);
    pathMat.specularColor = new Color3(0.04, 0.04, 0.04);

    // Entrance approach path
    const mainPath = MeshBuilder.CreateGround("mainPath", { width: 3.6, height: 16 }, this.scene);
    mainPath.position = new Vector3(0, 0.015, -11);
    mainPath.material = pathMat;

    // Central circular plaza around fountain
    const plaza = MeshBuilder.CreateDisc("plazaDisc", { radius: 6.8, tessellation: 32 }, this.scene);
    plaza.rotation.x = Math.PI / 2;
    plaza.position = new Vector3(TAMAN_KOTA_CONFIG.map.fountainCenter.x, 0.018, TAMAN_KOTA_CONFIG.map.fountainCenter.z);
    plaza.material = pathMat;
  }

  private buildFountain() {
    const fCenter = TAMAN_KOTA_CONFIG.map.fountainCenter;
    const stoneMat = new StandardMaterial("fountainStoneMat", this.scene);
    stoneMat.diffuseColor = new Color3(0.7, 0.72, 0.75);

    // Outer basin
    const basin = MeshBuilder.CreateCylinder("fountainBasin", {
      diameter: 5.6,
      height: 0.7,
      tessellation: 24,
    }, this.scene);
    basin.material = stoneMat;
    basin.position = new Vector3(fCenter.x, 0.35, fCenter.z);

    // Center tier
    const tier = MeshBuilder.CreateCylinder("fountainTier", {
      diameter: 2.2,
      height: 1.6,
      tessellation: 20,
    }, this.scene);
    tier.material = stoneMat;
    tier.position = new Vector3(fCenter.x, 0.8, fCenter.z);

    // Water Surface (initially static/low, animates when fountain active)
    const waterMat = new StandardMaterial("waterMat", this.scene);
    waterMat.diffuseColor = new Color3(0.2, 0.65, 0.95);
    waterMat.alpha = 0.75;

    this.fountainWaterMesh = MeshBuilder.CreateDisc("fountainWater", { radius: 2.55, tessellation: 24 }, this.scene);
    this.fountainWaterMesh.rotation.x = Math.PI / 2;
    this.fountainWaterMesh.position = new Vector3(fCenter.x, 0.62, fCenter.z);
    this.fountainWaterMesh.material = waterMat;

    // Register obstacle
    this.obstacles.push({
      x: fCenter.x,
      z: fCenter.z,
      radius: TAMAN_KOTA_CONFIG.map.fountainRadius,
    });
  }

  private buildParkProps() {
    const woodMat = new StandardMaterial("benchWoodMat", this.scene);
    woodMat.diffuseColor = new Color3(0.55, 0.35, 0.2);

    const trunkMat = new StandardMaterial("treeTrunkMat", this.scene);
    trunkMat.diffuseColor = new Color3(0.42, 0.28, 0.18);

    const leavesMat = new StandardMaterial("treeLeavesMat", this.scene);
    leavesMat.diffuseColor = new Color3(0.22, 0.58, 0.24);

    // 1. Six Benches
    const benchPositions = [
      { x: -7.5, z: -7, rotY: Math.PI / 4 },
      { x: 7.5, z: -7, rotY: -Math.PI / 4 },
      { x: -8.5, z: 2, rotY: Math.PI / 2 },
      { x: 8.5, z: 2, rotY: -Math.PI / 2 },
      { x: -6.5, z: 11, rotY: (3 * Math.PI) / 4 },
      { x: 6.5, z: 11, rotY: -(3 * Math.PI) / 4 },
    ];

    for (let i = 0; i < benchPositions.length; i++) {
      const b = benchPositions[i];
      const bench = MeshBuilder.CreateBox(`bench_${i}`, { width: 1.6, height: 0.5, depth: 0.6 }, this.scene);
      bench.material = woodMat;
      bench.position = new Vector3(b.x, 0.25, b.z);
      bench.rotation.y = b.rotY;

      this.obstacles.push({ x: b.x, z: b.z, radius: 0.8 });
    }

    // 2. Ten Trees (Instanced/Simple geometry)
    const treePositions = [
      { x: -14, z: -14 },
      { x: 14, z: -14 },
      { x: -15, z: -2 },
      { x: 15, z: -2 },
      { x: -15, z: 12 },
      { x: 15, z: 12 },
      { x: -8, z: 16 },
      { x: 8, z: 16 },
      { x: -3, z: 17 },
      { x: 3, z: 17 },
    ];

    for (let i = 0; i < treePositions.length; i++) {
      const tp = treePositions[i];
      const trunk = MeshBuilder.CreateCylinder(`trunk_${i}`, { diameter: 0.55, height: 2.2 }, this.scene);
      trunk.material = trunkMat;
      trunk.position = new Vector3(tp.x, 1.1, tp.z);

      const canopy = MeshBuilder.CreateSphere(`canopy_${i}`, { diameter: 2.6, segments: 6 }, this.scene);
      canopy.material = leavesMat;
      canopy.position = new Vector3(tp.x, 2.8, tp.z);

      this.obstacles.push({ x: tp.x, z: tp.z, radius: 1.1 });
    }

    // 3. Flowers Root (Appear with world progress)
    this.flowersRoot = new TransformNode("flowersRoot", this.scene);
    this.flowersRoot.setEnabled(false);

    const flowerColors = ["#EF4444", "#F59E0B", "#EC4899", "#8B5CF6"];
    for (let i = 0; i < 16; i++) {
      const col = flowerColors[i % flowerColors.length];
      const fMat = new StandardMaterial(`fMat_${i}`, this.scene);
      fMat.diffuseColor = Color3.FromHexString(col);

      const fl = MeshBuilder.CreateSphere(`flower_${i}`, { diameter: 0.24, segments: 4 }, this.scene);
      fl.material = fMat;
      const angle = (i * Math.PI) / 8;
      const radius = 6.0 + (i % 3) * 0.4;
      fl.position = new Vector3(
        TAMAN_KOTA_CONFIG.map.fountainCenter.x + Math.cos(angle) * radius,
        0.15,
        TAMAN_KOTA_CONFIG.map.fountainCenter.z + Math.sin(angle) * radius
      );
      fl.parent = this.flowersRoot;
    }

    // 4. Blocky Kid NPCs in playground (Appear in second half)
    this.npcKidsRoot = new TransformNode("npcKidsRoot", this.scene);
    this.npcKidsRoot.setEnabled(false);

    const kidMat = new StandardMaterial("kidMat", this.scene);
    kidMat.diffuseColor = Color3.FromHexString("#38BDF8");

    const kid1 = MeshBuilder.CreateBox("npcKid1", { width: 0.4, height: 0.8, depth: 0.3 }, this.scene);
    kid1.material = kidMat;
    kid1.position = new Vector3(-13, 0.4, 8);
    kid1.parent = this.npcKidsRoot;

    const kid2 = MeshBuilder.CreateBox("npcKid2", { width: 0.4, height: 0.8, depth: 0.3 }, this.scene);
    kid2.material = kidMat;
    kid2.position = new Vector3(-11.5, 0.4, 9);
    kid2.parent = this.npcKidsRoot;
  }

  onStart() {
    this.missionStartTime = Date.now();
    this.isCompleted = false;
    this.distanceTraveled = 0;
    this.lastPlayerPos.copyFrom(this.player.getPosition());

    // Record initial start event
    this.ctx.callbacks.onMissionProgress?.({
      current: 0,
      target: 8,
      message: "Pilah 8 sampah di taman kota ke tong yang tepat!",
    });
  }

  onUpdate(dt: number) {
    if (this.isCompleted) return;

    // 1. Read input vector and update player
    const moveVector = this.ctx.options ? (this.scene as any).__activeMoveInput || { x: 0, y: 0 } : { x: 0, y: 0 };
    const prevPos = this.player.getPosition().clone();

    // Camera angle relative to world Z
    const cameraAngle = 0; // Fixed third-person angle from behind (+Z forward)
    this.player.update(dt, moveVector, cameraAngle);

    // 2. Collision resolution (Circle vs Circle & Map boundary clamp)
    const pos = this.player.getPosition();
    const halfSize = TAMAN_KOTA_CONFIG.map.halfSize;
    pos.x = Math.max(-halfSize, Math.min(halfSize, pos.x));
    pos.z = Math.max(-halfSize, Math.min(halfSize, pos.z));

    for (const obs of this.obstacles) {
      const dx = pos.x - obs.x;
      const dz = pos.z - obs.z;
      const dist = Math.sqrt(dx * dx + dz * dz);
      const minDist = obs.radius + this.player.collisionRadius;

      if (dist < minDist && dist > 0.001) {
        // Slide along obstacle boundary
        const overlap = minDist - dist;
        pos.x += (dx / dist) * overlap;
        pos.z += (dz / dist) * overlap;
      }
    }

    // 3. Track distance traveled for interactive tutorial
    const deltaMove = Vector3.Distance(pos, this.lastPlayerPos);
    this.distanceTraveled += deltaMove;
    this.lastPlayerPos.copyFrom(pos);

    if (this.tutorialStage === "walk" && this.distanceTraveled >= 3.0) {
      this.tutorialStage = "pickup";
      this.ctx.requestEcobotBubble(TAMAN_KOTA_TUTORIAL.steps.moveSuccess, "happy");
    }

    // 4. Update Ecobot follow & Spawner
    this.ecobot.update(dt, pos, this.player.root.rotation.y);

    // Idle timer for hint assistance
    if (deltaMove < 0.02) {
      this.idleTimer += dt;
    } else {
      this.idleTimer = 0;
    }
    const showGuideArrow = this.idleTimer >= TAMAN_KOTA_CONFIG.interaction.idleHintSeconds;
    this.trashSpawner.update(dt, pos, showGuideArrow);

    // 5. Update Interaction System (find active target & HUD prompt)
    this.interactionSystem.update(pos, this.binsSystem, this.trashSpawner, this.inventory);

    // 6. Smooth Camera Follow
    const targetCamX = pos.x;
    const targetCamY = pos.y + TAMAN_KOTA_CONFIG.camera.height;
    const targetCamZ = pos.z - TAMAN_KOTA_CONFIG.camera.radius;

    this.camera.position.x += (targetCamX - this.camera.position.x) * Math.min(1, dt * TAMAN_KOTA_CONFIG.camera.lerpSpeed);
    this.camera.position.y += (targetCamY - this.camera.position.y) * Math.min(1, dt * TAMAN_KOTA_CONFIG.camera.lerpSpeed);
    this.camera.position.z += (targetCamZ - this.camera.position.z) * Math.min(1, dt * TAMAN_KOTA_CONFIG.camera.lerpSpeed);
    this.camera.setTarget(new Vector3(pos.x, pos.y + 1.2, pos.z));

    // 7. World Progress visual lerp
    this.updateWorldProgress(this.binSystem.totalSorted);
  }

  private updateWorldProgress(sortedCount: number) {
    const pct = Math.min(1, sortedCount / 8);

    // Lerp grass color from dusty greenish to vibrant lush green
    const dullGreen = new Color3(0.48, 0.65, 0.42);
    const lushGreen = new Color3(0.24, 0.74, 0.32);
    Color3.LerpToRef(dullGreen, lushGreen, pct, this.groundMat.diffuseColor);

    // Light intensity brightens
    this.hemiLight.intensity = 0.9 + pct * 0.3;
    this.dirLight.intensity = 0.65 + pct * 0.25;

    // Fog decreases as city becomes clean
    this.scene.fogDensity = Math.max(0.001, 0.008 * (1 - pct));

    // Flowers appear when sorted >= 3
    if (sortedCount >= 3 && !this.flowersRoot.isEnabled()) {
      this.flowersRoot.setEnabled(true);
    }

    // Blocky kid NPCs disabled per user request
    if (this.npcKidsRoot.isEnabled()) {
      this.npcKidsRoot.setEnabled(false);
    }

    // Animate fountain water if started
    if (sortedCount >= 1 && this.fountainWaterMesh) {
      this.fountainWaterMesh.position.y = 0.62 + Math.sin(Date.now() * 0.005) * 0.04;
    }

    // Local city cleanliness percent
    const cityMeter = Math.round(pct * 100);
    this.ctx.callbacks.onCityMeter?.(cityMeter);
  }

  onAction() {
    if (this.isCompleted) return;

    const target = this.interactionSystem.getCurrentTarget();

    if (target.type === "trash") {
      // 1. Pick up trash
      if (!this.inventory.isFull()) {
        const item = target.trash.data;
        this.trashSpawner.markPicked(item);
        this.inventory.addItem(item);
        this.audio.playPickup();

        if (this.tutorialStage === "pickup") {
          this.tutorialStage = "bin";
          const cap = this.inventory.getCapacity();
          this.ctx.requestEcobotBubble(
            TAMAN_KOTA_TUTORIAL.steps.pickupSuccess.replace("{capacity}", String(cap)),
            "happy"
          );
          setTimeout(() => {
            this.ctx.requestEcobotBubble(TAMAN_KOTA_TUTORIAL.steps.binGuidance, "encourage");
          }, 2400);
        }
      } else {
        // Bag full warning
        this.audio.playBagFull();
        this.ctx.requestEcobotBubble(TAMAN_KOTA_TUTORIAL.bubbles.bagFull, "encourage");
      }
    } else if (target.type === "bin") {
      // 2. Sort into bin
      const selectedItem = this.inventory.getSelectedItem();
      if (!selectedItem) return;

      const result = this.binSystem.sortItem(selectedItem, target.bin, this.inventory);

      if (result.isCorrect) {
        if (this.tutorialStage === "bin") {
          this.tutorialStage = "free";
          this.ctx.requestEcobotBubble(TAMAN_KOTA_TUTORIAL.steps.firstSortSuccess, "happy");
        } else if (this.binSystem.totalSorted === 4) {
          this.ctx.requestEcobotBubble(TAMAN_KOTA_TUTORIAL.bubbles.halfway, "happy");
        } else if (this.binSystem.totalSorted === 7) {
          this.ctx.requestEcobotBubble(TAMAN_KOTA_TUTORIAL.bubbles.lastOne, "happy");
        }

        // Check mission complete
        if (this.binSystem.isMissionFinished()) {
          this.triggerCompletion();
        }
      }
    }
  }

  private triggerCompletion() {
    this.isCompleted = true;
    this.audio.playMissionComplete();
    this.ecobot.triggerReaction("cheer");

    const timeSeconds = Math.max(12, Math.round((Date.now() - this.missionStartTime) / 1000));
    const accuracy = this.binSystem.getAccuracy();
    const stars = this.binSystem.calculateStars();
    const score = this.binSystem.correctCount * 10 - this.binSystem.wrongCount * 2;

    const nick = this.ctx.options.nickname || "Pahlawan Cilik";
    this.ctx.requestEcobotBubble(
      TAMAN_KOTA_TUTORIAL.bubbles.completed.replace("{nickname}", nick),
      "cheer"
    );

    setTimeout(() => {
      this.ctx.callbacks.onMissionComplete?.({
        missionId: 1,
        accuracy,
        timeSeconds,
        stars,
        score: Math.max(0, score),
        stats: {
          correctCount: this.binSystem.correctCount,
          wrongCount: this.binSystem.wrongCount,
          hintsUsed: this.binSystem.hintsUsed,
        },
        factHighlight: "Kulit pisang membutuhkan waktu 2 hingga 5 minggu untuk terurai alami di dalam tanah.",
      });
    }, 1200);
  }

  // Developer teleport & test helpers
  public devTeleportToBin() {
    this.player.setPosition(new Vector3(0, 0, -13));
  }

  public devTeleportToTrash() {
    const nearest = this.trashSpawner.getNearestRemainingTrash(this.player.getPosition());
    if (nearest) {
      this.player.setPosition(new Vector3(nearest.root.position.x, 0, nearest.root.position.z - 1.2));
    }
  }

  public devFinishMission() {
    this.binSystem.correctCount = 8;
    this.binSystem.totalSorted = 8;
    this.triggerCompletion();
  }

  public requestHint() {
    this.binSystem.hintsUsed++;
    this.idleTimer = TAMAN_KOTA_CONFIG.interaction.idleHintSeconds; // Force guide arrow to show
    this.ctx.requestEcobotBubble(TAMAN_KOTA_TUTORIAL.bubbles.idleHint, "encourage");
  }

  dispose() {
    this.player?.dispose();
    this.ecobot?.dispose();
    this.binsSystem?.dispose();
    this.trashSpawner?.dispose();
    this.audio?.dispose();
  }
}
