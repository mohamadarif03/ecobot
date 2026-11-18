import {
  TransformNode,
  MeshBuilder,
  StandardMaterial,
  Color3,
  Vector3,
  type Scene,
  type Mesh,
} from "@babylonjs/core";

export class EcobotEntity {
  public root: TransformNode;

  private scene: Scene;
  private bodyMesh: Mesh;
  private headMesh: Mesh;
  private leafMesh: Mesh;
  private antennaMesh: Mesh;
  private eyeLMesh: Mesh;
  private eyeRMesh: Mesh;
  private shadowMesh: Mesh;

  private floatTime = 0;
  private reduceMotion = false;
  private targetOffset = new Vector3(-1.1, 1.4, -0.9);

  constructor(scene: Scene, reduceMotion = false) {
    this.scene = scene;
    this.reduceMotion = reduceMotion;

    this.root = new TransformNode("ecobotRoot", scene);
    this.root.position = new Vector3(-1.2, 1.4, -15.5);

    // Materials
    const skyBlueMat = new StandardMaterial("ecobotSkyMat", scene);
    skyBlueMat.diffuseColor = Color3.FromHexString("#5BC0EB");
    skyBlueMat.specularColor = new Color3(0.2, 0.2, 0.2);

    const bellyMat = new StandardMaterial("ecobotBellyMat", scene);
    bellyMat.diffuseColor = Color3.FromHexString("#FFFFFF");

    const leafGreenMat = new StandardMaterial("ecobotLeafMat", scene);
    leafGreenMat.diffuseColor = Color3.FromHexString("#4ADE80");

    const eyeMat = new StandardMaterial("ecobotEyeMat", scene);
    eyeMat.diffuseColor = new Color3(0.08, 0.08, 0.12);

    const cheekMat = new StandardMaterial("ecobotCheekMat", scene);
    cheekMat.diffuseColor = Color3.FromHexString("#F472B6");

    // 1. Torso (Canister shape)
    this.bodyMesh = MeshBuilder.CreateCylinder("ecobotBody", { diameter: 0.44, height: 0.45, tessellation: 16 }, scene);
    this.bodyMesh.material = skyBlueMat;
    this.bodyMesh.position.y = 0.22;
    this.bodyMesh.parent = this.root;

    // Belly patch
    const belly = MeshBuilder.CreateCylinder("ecobotBelly", { diameter: 0.32, height: 0.3, tessellation: 16 }, scene);
    belly.material = bellyMat;
    belly.position = new Vector3(0, 0.22, 0.1);
    belly.scaling = new Vector3(0.9, 0.9, 0.6);
    belly.parent = this.root;

    // 2. Head
    this.headMesh = MeshBuilder.CreateBox("ecobotHead", { width: 0.48, height: 0.42, depth: 0.4 }, scene);
    this.headMesh.material = skyBlueMat;
    this.headMesh.position.y = 0.65;
    this.headMesh.parent = this.root;

    // Face screen / eyes
    this.eyeLMesh = MeshBuilder.CreateSphere("ecobotEyeL", { diameter: 0.09 }, scene);
    this.eyeLMesh.material = eyeMat;
    this.eyeLMesh.position = new Vector3(-0.11, 0.67, 0.21);
    this.eyeLMesh.parent = this.root;

    this.eyeRMesh = MeshBuilder.CreateSphere("ecobotEyeR", { diameter: 0.09 }, scene);
    this.eyeRMesh.material = eyeMat;
    this.eyeRMesh.position = new Vector3(0.11, 0.67, 0.21);
    this.eyeRMesh.parent = this.root;

    // Cheeks
    const cheekL = MeshBuilder.CreateDisc("ecobotCheekL", { radius: 0.045 }, scene);
    cheekL.material = cheekMat;
    cheekL.position = new Vector3(-0.14, 0.58, 0.21);
    cheekL.parent = this.root;

    const cheekR = MeshBuilder.CreateDisc("ecobotCheekR", { radius: 0.045 }, scene);
    cheekR.material = cheekMat;
    cheekR.position = new Vector3(0.14, 0.58, 0.21);
    cheekR.parent = this.root;

    // 3. Antenna & Leaf sprout
    this.antennaMesh = MeshBuilder.CreateCylinder("ecobotAntenna", { diameter: 0.04, height: 0.16 }, scene);
    this.antennaMesh.material = skyBlueMat;
    this.antennaMesh.position.y = 0.92;
    this.antennaMesh.parent = this.root;

    this.leafMesh = MeshBuilder.CreateSphere("ecobotLeaf", { diameterX: 0.14, diameterY: 0.06, diameterZ: 0.1 }, scene);
    this.leafMesh.material = leafGreenMat;
    this.leafMesh.rotation.z = Math.PI / 4;
    this.leafMesh.position = new Vector3(0.04, 1.02, 0);
    this.leafMesh.parent = this.root;

    // 4. Ground Shadow
    const shadowMat = new StandardMaterial("ecobotShadowMat", scene);
    shadowMat.diffuseColor = new Color3(0.1, 0.15, 0.1);
    shadowMat.alpha = 0.3;
    this.shadowMesh = MeshBuilder.CreateDisc("ecobotShadow", { radius: 0.32 }, scene);
    this.shadowMesh.rotation.x = Math.PI / 2;
    this.shadowMesh.position.y = 0.02;
    this.shadowMesh.material = shadowMat;
  }

  public setVisible(visible: boolean) {
    this.root.setEnabled(visible);
    if (this.shadowMesh) {
      this.shadowMesh.setEnabled(visible);
    }
  }

  public update(dt: number, playerPos: Vector3, playerRotY: number) {
    this.floatTime += dt * 3.2;

    // Calculate desired hovering position relative to player
    const cosR = Math.cos(playerRotY);
    const sinR = Math.sin(playerRotY);

    const worldOffsetX = this.targetOffset.x * cosR - this.targetOffset.z * sinR;
    const worldOffsetZ = this.targetOffset.x * sinR + this.targetOffset.z * cosR;

    const hoverY = !this.reduceMotion
      ? this.targetOffset.y + Math.sin(this.floatTime) * 0.12
      : this.targetOffset.y;

    const targetPos = new Vector3(
      playerPos.x + worldOffsetX,
      playerPos.y + hoverY,
      playerPos.z + worldOffsetZ
    );

    // Smooth lerp follow
    Vector3.LerpToRef(this.root.position, targetPos, Math.min(1, dt * 4.5), this.root.position);

    // Look slightly towards player
    const lookTarget = playerPos.clone();
    lookTarget.y += 1.2;
    this.root.lookAt(lookTarget, 0, Math.PI, 0);

    // Update shadow position directly beneath Ecobot
    this.shadowMesh.position.x = this.root.position.x;
    this.shadowMesh.position.z = this.root.position.z;
    this.shadowMesh.scaling.setAll(Math.max(0.2, 1 - (this.root.position.y - 1.2) * 0.3));
  }

  public triggerReaction(reaction: "happy" | "encourage" | "cheer" | "shock") {
    if (this.reduceMotion) return;

    if (reaction === "happy" || reaction === "cheer") {
      this.root.position.y += 0.35;
      this.leafMesh.rotation.z += Math.PI * 0.5;
    } else if (reaction === "shock") {
      this.root.scaling.setAll(1.15);
      setTimeout(() => this.root.scaling.setAll(1.0), 300);
    }
  }

  public dispose() {
    this.root.dispose();
    this.shadowMesh.dispose();
  }
}
