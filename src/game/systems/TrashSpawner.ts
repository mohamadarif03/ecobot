import {
  TransformNode,
  MeshBuilder,
  StandardMaterial,
  Color3,
  Vector3,
  type Scene,
  type Mesh,
} from "@babylonjs/core";
import { TAMAN_KOTA_CONFIG } from "../data/tamanKotaConfig";
import { MISSION_1_TRASH_ITEMS } from "../data/trashTypes";
import type { TrashItemData } from "../engine/types";

export interface ActiveTrashInstance {
  data: TrashItemData;
  root: TransformNode;
  mesh: Mesh;
  shadowMesh: Mesh;
  pulseRing: Mesh;
  initialY: number;
  picked: boolean;
}

export class TrashSpawner {
  public activeTrash: ActiveTrashInstance[] = [];
  public guideArrow: TransformNode;

  private scene: Scene;
  private animTime = 0;
  private reduceMotion = false;
  private arrowMesh: Mesh;

  constructor(scene: Scene, reduceMotion = false) {
    this.scene = scene;
    this.reduceMotion = reduceMotion;

    // Build Guide Arrow (Direction indicator)
    this.guideArrow = new TransformNode("guideArrowRoot", scene);
    this.guideArrow.setEnabled(false);

    const arrowMat = new StandardMaterial("guideArrowMat", scene);
    arrowMat.diffuseColor = Color3.FromHexString("#22C55E");
    arrowMat.emissiveColor = Color3.FromHexString("#4ADE80");

    this.arrowMesh = MeshBuilder.CreateCylinder("arrowMesh", {
      diameterTop: 0,
      diameterBottom: 0.35,
      height: 0.65,
      tessellation: 4,
    }, scene);
    this.arrowMesh.rotation.x = Math.PI / 2;
    this.arrowMesh.position.z = 0.4;
    this.arrowMesh.material = arrowMat;
    this.arrowMesh.parent = this.guideArrow;

    this.spawnTrash();
  }

  public spawnTrash() {
    // Clean up any existing
    this.disposeTrash();

    // 1. Shuffle and pick 8 spawn points from the 12 candidate points
    const points = [...TAMAN_KOTA_CONFIG.trashSpawnCandidatePoints];
    for (let i = points.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [points[i], points[j]] = [points[j], points[i]];
    }
    const chosenPoints = points.slice(0, 8);

    // 2. Shuffle trash items so layout changes each run
    const shuffledItems = [...MISSION_1_TRASH_ITEMS];
    for (let i = shuffledItems.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffledItems[i], shuffledItems[j]] = [shuffledItems[j], shuffledItems[i]];
    }

    // 3. Build each trash instance
    for (let i = 0; i < chosenPoints.length; i++) {
      const pt = chosenPoints[i];
      const item = shuffledItems[i];

      const root = new TransformNode(`trashRoot_${item.id}`, this.scene);
      root.position = new Vector3(pt.x, pt.y, pt.z);

      const trashMat = new StandardMaterial(`trashMat_${item.id}`, this.scene);
      trashMat.diffuseColor = Color3.FromHexString(item.colorHex);
      trashMat.specularColor = new Color3(0.2, 0.2, 0.2);

      // Distinct geometric model per trash type
      let mesh: Mesh;
      switch (item.id) {
        case "kulit-pisang":
          mesh = MeshBuilder.CreateTorus(`m_${item.id}`, { diameter: 0.35, thickness: 0.08, tessellation: 12 }, this.scene);
          mesh.rotation.x = Math.PI / 3;
          break;
        case "sisa-nasi":
          mesh = MeshBuilder.CreateBox(`m_${item.id}`, { width: 0.28, height: 0.18, depth: 0.28 }, this.scene);
          break;
        case "daun-kering":
          mesh = MeshBuilder.CreateDisc(`m_${item.id}`, { radius: 0.22, tessellation: 6 }, this.scene);
          mesh.rotation.x = Math.PI / 2;
          break;
        case "botol-plastik":
          mesh = MeshBuilder.CreateCylinder(`m_${item.id}`, { diameter: 0.18, height: 0.42, tessellation: 12 }, this.scene);
          mesh.rotation.z = Math.PI / 3;
          break;
        case "kaleng-minuman":
          mesh = MeshBuilder.CreateCylinder(`m_${item.id}`, { diameter: 0.22, height: 0.32, tessellation: 12 }, this.scene);
          break;
        case "kardus-bekas":
          mesh = MeshBuilder.CreateBox(`m_${item.id}`, { width: 0.38, height: 0.24, depth: 0.32 }, this.scene);
          break;
        case "baterai-bekas":
          mesh = MeshBuilder.CreateCylinder(`m_${item.id}`, { diameter: 0.14, height: 0.28, tessellation: 12 }, this.scene);
          mesh.rotation.x = Math.PI / 2;
          break;
        case "lampu-bekas":
        default:
          mesh = MeshBuilder.CreateSphere(`m_${item.id}`, { diameter: 0.28 }, this.scene);
          break;
      }

      mesh.material = trashMat;
      mesh.position.y = 0.2;
      mesh.parent = root;

      // Pulse ring on ground
      const ringMat = new StandardMaterial(`trashRingMat_${item.id}`, this.scene);
      ringMat.diffuseColor = Color3.FromHexString(item.colorHex);
      ringMat.alpha = 0.45;

      const pulseRing = MeshBuilder.CreateTorus(`trashRing_${item.id}`, {
        diameter: 0.8,
        thickness: 0.04,
        tessellation: 16,
      }, this.scene);
      pulseRing.material = ringMat;
      pulseRing.position.y = 0.03;
      pulseRing.parent = root;

      // Blob shadow
      const shadowMat = new StandardMaterial(`trashShadowMat_${item.id}`, this.scene);
      shadowMat.diffuseColor = new Color3(0.1, 0.15, 0.1);
      shadowMat.alpha = 0.35;

      const shadow = MeshBuilder.CreateDisc(`trashShadow_${item.id}`, { radius: 0.25 }, this.scene);
      shadow.rotation.x = Math.PI / 2;
      shadow.position.y = 0.02;
      shadow.material = shadowMat;
      shadow.parent = root;

      this.activeTrash.push({
        data: item,
        root,
        mesh,
        shadowMesh: shadow,
        pulseRing,
        initialY: pt.y,
        picked: false,
      });
    }
  }

  public update(dt: number, playerPos: Vector3, showHint = false) {
    this.animTime += dt * 3.5;

    // Animate floating trash
    for (const t of this.activeTrash) {
      if (t.picked) continue;

      if (!this.reduceMotion) {
        t.mesh.position.y = 0.2 + Math.sin(this.animTime + t.root.position.x) * 0.06;
        t.mesh.rotation.y += dt * 1.5;
        t.pulseRing.scaling.setAll(0.9 + Math.sin(this.animTime * 1.5) * 0.15);
      }
    }

    // Guide arrow handling
    const nearest = this.getNearestRemainingTrash(playerPos);
    if (showHint && nearest) {
      this.guideArrow.setEnabled(true);
      this.guideArrow.position = new Vector3(playerPos.x, playerPos.y + 1.8, playerPos.z);
      this.guideArrow.lookAt(nearest.root.position);
    } else {
      this.guideArrow.setEnabled(false);
    }
  }

  public getNearestRemainingTrash(playerPos: Vector3): ActiveTrashInstance | null {
    let nearest: ActiveTrashInstance | null = null;
    let minD2 = Infinity;

    for (const t of this.activeTrash) {
      if (t.picked) continue;
      const dx = t.root.position.x - playerPos.x;
      const dz = t.root.position.z - playerPos.z;
      const d2 = dx * dx + dz * dz;
      if (d2 < minD2) {
        minD2 = d2;
        nearest = t;
      }
    }
    return nearest;
  }

  public markPicked(item: TrashItemData) {
    const found = this.activeTrash.find((t) => !t.picked && t.data.id === item.id);
    if (found) {
      found.picked = true;
      found.root.setEnabled(false);
    }
  }

  public restoreToWorld(item: TrashItemData) {
    const found = this.activeTrash.find((t) => t.picked && t.data.id === item.id);
    if (found) {
      found.picked = false;
      found.root.setEnabled(true);
    }
  }

  public getRemainingCount(): number {
    return this.activeTrash.filter((t) => !t.picked).length;
  }

  private disposeTrash() {
    for (const t of this.activeTrash) {
      t.root.dispose();
    }
    this.activeTrash = [];
  }

  public dispose() {
    this.disposeTrash();
    this.guideArrow.dispose();
  }
}
