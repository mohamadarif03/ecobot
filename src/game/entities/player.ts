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
import type { PlayerState } from "../../types/player";

export class PlayerEntity {
  public root: TransformNode;
  public collisionRadius = TAMAN_KOTA_CONFIG.player.collisionRadius;

  private scene: Scene;
  private torsoMesh: Mesh;
  private headMesh: Mesh;
  private leftArmMesh: Mesh;
  private rightArmMesh: Mesh;
  private leftLegMesh: Mesh;
  private rightLegMesh: Mesh;
  private shadowMesh: Mesh;
  private trashFloatNodes: TransformNode[] = [];

  private walkAnimTime = 0;
  private isMoving = false;
  private speed = TAMAN_KOTA_CONFIG.player.baseSpeed;
  private reduceMotion = false;

  constructor(
    scene: Scene,
    character: PlayerState["character"],
    inventory: PlayerState["inventory"],
    upgrades: PlayerState["upgrades"],
    reduceMotion = false
  ) {
    this.scene = scene;
    this.reduceMotion = reduceMotion;

    // Calculate speed bonus from shoes upgrade
    const shoeLevel = upgrades?.shoes || 0;
    this.speed =
      TAMAN_KOTA_CONFIG.player.baseSpeed *
      (1 + shoeLevel * TAMAN_KOTA_CONFIG.player.speedMultiplierPerShoeLevel);

    this.root = new TransformNode("playerRoot", scene);
    this.root.position = new Vector3(
      TAMAN_KOTA_CONFIG.map.spawnPoint.x,
      TAMAN_KOTA_CONFIG.map.spawnPoint.y,
      TAMAN_KOTA_CONFIG.map.spawnPoint.z
    );

    // 1. Materials
    const skinColorHex = character?.skin === "peach" ? "#FBCFE8" : character?.skin === "tan" ? "#D97706" : "#FDE68A";
    const skinMat = new StandardMaterial("playerSkinMat", scene);
    skinMat.diffuseColor = Color3.FromHexString(skinColorHex);
    skinMat.specularColor = new Color3(0.05, 0.05, 0.05);

    const outfitColorHex = character?.outfitColor || "#22C55E";
    const outfitMat = new StandardMaterial("playerOutfitMat", scene);
    outfitMat.diffuseColor = Color3.FromHexString(outfitColorHex);
    outfitMat.specularColor = new Color3(0.1, 0.1, 0.1);

    const pantsMat = new StandardMaterial("playerPantsMat", scene);
    pantsMat.diffuseColor = new Color3(0.15, 0.25, 0.45); // Denim blue
    pantsMat.specularColor = new Color3(0.05, 0.05, 0.05);

    const darkEyeMat = new StandardMaterial("playerEyeMat", scene);
    darkEyeMat.diffuseColor = new Color3(0.1, 0.1, 0.15);

    // 2. Torso (Body)
    this.torsoMesh = MeshBuilder.CreateBox("playerTorso", { width: 0.6, height: 0.65, depth: 0.35 }, scene);
    this.torsoMesh.material = outfitMat;
    this.torsoMesh.position.y = 0.95;
    this.torsoMesh.parent = this.root;

    // 3. Head
    this.headMesh = MeshBuilder.CreateBox("playerHead", { width: 0.46, height: 0.46, depth: 0.46 }, scene);
    this.headMesh.material = skinMat;
    this.headMesh.position.y = 1.55;
    this.headMesh.parent = this.root;

    // Eyes
    const leftEye = MeshBuilder.CreateBox("playerEyeL", { width: 0.07, height: 0.09, depth: 0.03 }, scene);
    leftEye.material = darkEyeMat;
    leftEye.position = new Vector3(-0.11, 1.57, 0.24);
    leftEye.parent = this.root;

    const rightEye = MeshBuilder.CreateBox("playerEyeR", { width: 0.07, height: 0.09, depth: 0.03 }, scene);
    rightEye.material = darkEyeMat;
    rightEye.position = new Vector3(0.11, 1.57, 0.24);
    rightEye.parent = this.root;

    // 4. Arms (Pivoted at shoulders)
    this.leftArmMesh = MeshBuilder.CreateBox("playerArmL", { width: 0.22, height: 0.6, depth: 0.25 }, scene);
    this.leftArmMesh.material = skinMat;
    this.leftArmMesh.setPivotPoint(new Vector3(0, 0.28, 0));
    this.leftArmMesh.position = new Vector3(-0.43, 0.95, 0);
    this.leftArmMesh.parent = this.root;

    this.rightArmMesh = MeshBuilder.CreateBox("playerArmR", { width: 0.22, height: 0.6, depth: 0.25 }, scene);
    this.rightArmMesh.material = skinMat;
    this.rightArmMesh.setPivotPoint(new Vector3(0, 0.28, 0));
    this.rightArmMesh.position = new Vector3(0.43, 0.95, 0);
    this.rightArmMesh.parent = this.root;

    // 5. Legs (Pivoted at hips)
    this.leftLegMesh = MeshBuilder.CreateBox("playerLegL", { width: 0.24, height: 0.6, depth: 0.26 }, scene);
    this.leftLegMesh.material = pantsMat;
    this.leftLegMesh.setPivotPoint(new Vector3(0, 0.3, 0));
    this.leftLegMesh.position = new Vector3(-0.16, 0.3, 0);
    this.leftLegMesh.parent = this.root;

    this.rightLegMesh = MeshBuilder.CreateBox("playerLegR", { width: 0.24, height: 0.6, depth: 0.26 }, scene);
    this.rightLegMesh.material = pantsMat;
    this.rightLegMesh.setPivotPoint(new Vector3(0, 0.3, 0));
    this.rightLegMesh.position = new Vector3(0.16, 0.3, 0);
    this.rightLegMesh.parent = this.root;

    // 6. Accessories (Hat / Glasses based on equipped cosmetics)
    const equipped = inventory?.equipped?.character || {};
    if (equipped.topi) {
      const hatMat = new StandardMaterial("playerHatMat", scene);
      hatMat.diffuseColor = new Color3(0.2, 0.6, 0.9);
      const hat = MeshBuilder.CreateCylinder("playerHat", { diameter: 0.62, height: 0.16 }, scene);
      hat.material = hatMat;
      hat.position.y = 1.84;
      hat.parent = this.root;
    }

    if (equipped.kacamata) {
      const glassesMat = new StandardMaterial("playerGlassesMat", scene);
      glassesMat.diffuseColor = new Color3(0.1, 0.1, 0.1);
      const glasses = MeshBuilder.CreateBox("playerGlasses", { width: 0.38, height: 0.1, depth: 0.05 }, scene);
      glasses.material = glassesMat;
      glasses.position = new Vector3(0, 1.57, 0.25);
      glasses.parent = this.root;
    }

    // 7. Blob Shadow beneath character
    const shadowMat = new StandardMaterial("playerShadowMat", scene);
    shadowMat.diffuseColor = new Color3(0.05, 0.1, 0.05);
    shadowMat.alpha = 0.38;
    this.shadowMesh = MeshBuilder.CreateDisc("playerShadow", { radius: 0.52 }, scene);
    this.shadowMesh.rotation.x = Math.PI / 2;
    this.shadowMesh.position.y = 0.02;
    this.shadowMesh.material = shadowMat;
    this.shadowMesh.parent = this.root;
  }

  public getPosition(): Vector3 {
    return this.root.position;
  }

  public setPosition(pos: Vector3) {
    this.root.position.copyFrom(pos);
  }

  public getSpeed(): number {
    return this.speed;
  }

  public update(dt: number, moveInput: { x: number; y: number }, cameraAngle: number) {
    const inputMag = Math.sqrt(moveInput.x * moveInput.x + moveInput.y * moveInput.y);
    this.isMoving = inputMag > 0.05;

    if (this.isMoving) {
      // Calculate world movement relative to camera
      const moveAngle = Math.atan2(moveInput.x, moveInput.y) + cameraAngle;
      const targetRotationY = moveAngle;

      // Smooth rotate towards moving direction
      let diff = targetRotationY - this.root.rotation.y;
      while (diff > Math.PI) diff -= Math.PI * 2;
      while (diff < -Math.PI) diff += Math.PI * 2;
      this.root.rotation.y += diff * Math.min(1, dt * TAMAN_KOTA_CONFIG.player.rotationSmoothSpeed);

      // Translate position
      const moveX = Math.sin(targetRotationY) * this.speed * inputMag * dt;
      const moveZ = Math.cos(targetRotationY) * this.speed * inputMag * dt;

      this.root.position.x += moveX;
      this.root.position.z += moveZ;

      // Animate limb swing
      this.walkAnimTime += dt * 11;
      const swing = Math.sin(this.walkAnimTime) * 0.65;

      this.leftArmMesh.rotation.x = -swing;
      this.rightArmMesh.rotation.x = swing;
      this.leftLegMesh.rotation.x = swing;
      this.rightLegMesh.rotation.x = -swing;

      if (!this.reduceMotion) {
        this.torsoMesh.position.y = 0.95 + Math.abs(Math.sin(this.walkAnimTime * 2)) * 0.04;
        this.headMesh.position.y = 1.55 + Math.abs(Math.sin(this.walkAnimTime * 2)) * 0.04;
      }
    } else {
      // Return smoothly to idle
      this.leftArmMesh.rotation.x *= Math.max(0, 1 - dt * 10);
      this.rightArmMesh.rotation.x *= Math.max(0, 1 - dt * 10);
      this.leftLegMesh.rotation.x *= Math.max(0, 1 - dt * 10);
      this.rightLegMesh.rotation.x *= Math.max(0, 1 - dt * 10);

      // Subtle breathing idle
      this.walkAnimTime += dt * 2.5;
      const breathe = !this.reduceMotion ? Math.sin(this.walkAnimTime) * 0.02 : 0;
      this.torsoMesh.position.y = 0.95 + breathe;
      this.headMesh.position.y = 1.55 + breathe;
    }
  }

  public updateCarriedItems(itemsCount: number) {
    // Clear previous floaters
    for (const node of this.trashFloatNodes) {
      node.dispose();
    }
    this.trashFloatNodes = [];

    const count = Math.min(3, itemsCount);
    for (let i = 0; i < count; i++) {
      const node = new TransformNode(`carryNode_${i}`, this.scene);
      node.parent = this.root;
      const angle = (i * (Math.PI * 2)) / count;
      node.position = new Vector3(Math.cos(angle) * 0.35, 2.05, Math.sin(angle) * 0.35);

      const miniMat = new StandardMaterial(`carryMat_${i}`, this.scene);
      miniMat.diffuseColor = new Color3(0.2, 0.8, 0.4);

      const miniMesh = MeshBuilder.CreateBox(`carryMesh_${i}`, { size: 0.16 }, this.scene);
      miniMesh.material = miniMat;
      miniMesh.parent = node;

      this.trashFloatNodes.push(node);
    }
  }

  public dispose() {
    this.root.dispose();
  }
}
