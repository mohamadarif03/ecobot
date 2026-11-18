import {
  TransformNode,
  MeshBuilder,
  StandardMaterial,
  DynamicTexture,
  Color3,
  Vector3,
  type Scene,
  type Mesh,
} from "@babylonjs/core";
import { TAMAN_KOTA_CONFIG } from "../data/tamanKotaConfig";
import type { TrashCategory } from "../engine/types";

export interface BinItemEntry {
  id: string;
  category: TrashCategory;
  name: string;
  label: string;
  colorHex: string;
  position: { x: number; y: number; z: number };
  root: TransformNode;
  lidMesh: Mesh;
  bodyMesh: Mesh;
  highlightRing: Mesh;
  triggerOpen: () => void;
  triggerShake: () => void;
}

export class TrashBinsSystem {
  public bins: BinItemEntry[] = [];
  private scene: Scene;

  constructor(scene: Scene) {
    this.scene = scene;
    this.buildBins();
  }

  private buildBins() {
    for (const conf of TAMAN_KOTA_CONFIG.bins) {
      const root = new TransformNode(`binRoot_${conf.id}`, this.scene);
      root.position = new Vector3(conf.position.x, conf.position.y, conf.position.z);

      // 1. Material for bin body
      const binMat = new StandardMaterial(`binMat_${conf.id}`, this.scene);
      binMat.diffuseColor = Color3.FromHexString(conf.colorHex);
      binMat.specularColor = new Color3(0.15, 0.15, 0.15);

      // 2. Canister Body
      const body = MeshBuilder.CreateCylinder(`binBody_${conf.id}`, {
        diameter: 1.0,
        height: 1.4,
        tessellation: 20,
      }, this.scene);
      body.material = binMat;
      body.position.y = 0.7;
      body.parent = root;

      // 3. Lid (Hinged at back)
      const lidMat = new StandardMaterial(`binLidMat_${conf.id}`, this.scene);
      lidMat.diffuseColor = Color3.FromHexString(conf.colorHex).scale(0.8);

      const lid = MeshBuilder.CreateCylinder(`binLid_${conf.id}`, {
        diameter: 1.08,
        height: 0.18,
        tessellation: 20,
      }, this.scene);
      lid.material = lidMat;
      lid.setPivotPoint(new Vector3(0, 0, -0.45));
      lid.position.y = 1.48;
      lid.parent = root;

      // 4. Accessible Dynamic Label Texture (Text + Icon)
      const signPlane = MeshBuilder.CreatePlane(`binSign_${conf.id}`, { width: 0.8, height: 0.65 }, this.scene);
      signPlane.position = new Vector3(0, 0.75, 0.51);
      signPlane.parent = root;

      const dynTexture = new DynamicTexture(`dynSign_${conf.id}`, { width: 512, height: 416 }, this.scene, true);
      const signMat = new StandardMaterial(`signMat_${conf.id}`, this.scene);
      signMat.diffuseTexture = dynTexture;
      signMat.specularColor = new Color3(0, 0, 0);
      signPlane.material = signMat;

      // Draw clear high-contrast label + icon
      const ctx = dynTexture.getContext() as CanvasRenderingContext2D;
      ctx.fillStyle = "#FFFFFF";
      ctx.fillRect(0, 0, 512, 416);

      // Header colored border
      ctx.fillStyle = conf.colorHex;
      ctx.fillRect(0, 0, 512, 48);

      // Category Icon
      ctx.font = "bold 96px sans-serif";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      const icon = conf.category === "organik" ? "🌿" : conf.category === "anorganik" ? "🍾" : "⚠️";
      ctx.fillText(icon, 256, 175);

      // Text Title
      ctx.fillStyle = "#0F172A";
      ctx.font = "900 64px sans-serif";
      ctx.fillText(conf.label, 256, 290);

      // Subtitle
      ctx.fillStyle = "#475569";
      ctx.font = "bold 34px sans-serif";
      const sub = conf.category === "organik" ? "Sisa Makanan" : conf.category === "anorganik" ? "Plastik & Kertas" : "Limbah Beracun";
      ctx.fillText(sub, 256, 355);
      dynTexture.update();

      // 5. Highlight ring on ground when player approaches
      const ringMat = new StandardMaterial(`ringMat_${conf.id}`, this.scene);
      ringMat.diffuseColor = Color3.FromHexString(conf.colorHex);
      ringMat.emissiveColor = Color3.FromHexString(conf.colorHex).scale(0.4);
      ringMat.alpha = 0;

      const highlightRing = MeshBuilder.CreateTorus(`ring_${conf.id}`, {
        diameter: 2.2,
        thickness: 0.08,
        tessellation: 24,
      }, this.scene);
      highlightRing.material = ringMat;
      highlightRing.position.y = 0.04;
      highlightRing.parent = root;

      // Lid Open & Shake animations
      const triggerOpen = () => {
        lid.rotation.x = -Math.PI / 3;
        setTimeout(() => {
          lid.rotation.x = 0;
        }, 500);
      };

      const triggerShake = () => {
        let count = 0;
        const interval = setInterval(() => {
          body.rotation.z = (count % 2 === 0 ? 0.08 : -0.08);
          count++;
          if (count > 5) {
            clearInterval(interval);
            body.rotation.z = 0;
          }
        }, 40);
      };

      this.bins.push({
        id: conf.id,
        category: conf.category as TrashCategory,
        name: conf.name,
        label: conf.label,
        colorHex: conf.colorHex,
        position: conf.position,
        root,
        lidMesh: lid,
        bodyMesh: body,
        highlightRing,
        triggerOpen,
        triggerShake,
      });
    }
  }

  public setHighlight(binId: string | null) {
    for (const bin of this.bins) {
      const ringMat = bin.highlightRing.material as StandardMaterial;
      if (ringMat) {
        ringMat.alpha = bin.id === binId ? 0.75 : 0;
      }
    }
  }

  public dispose() {
    for (const bin of this.bins) {
      bin.root.dispose();
    }
    this.bins = [];
  }
}
