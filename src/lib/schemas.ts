import { z } from "zod";

export const loginSchema = z.object({
  email: z.string().email("Email tidak valid"),
  password: z.string().min(8, "Minimal 8 karakter")
});

const plateMaterialSchema = z.enum(["aluminium", "brass", "steel"]);
const simSpeedSchema = z.enum(["normal", "slow", "ultra"]);

export const simulationSchema = z.object({
  voltage: z.number().min(0).max(600),
  polarity: z.enum(["top-positive", "bottom-positive"]),
  riseTime: z.number().min(0),
  fallTime: z.number().min(0),
  dropletRadiusMicron: z.number().optional(),
  temperatureC: z.number().optional(),
  plateTop: plateMaterialSchema.default("brass"),
  plateBottom: plateMaterialSchema.default("brass"),
  simSpeed: simSpeedSchema.default("normal"),
  offsetVoltage: z.number().default(0),
  showElectricField: z.boolean().default(false)
});

export const simulationRunSchema = z.object({
  method: z.enum(["floating", "rising"]),
  parameters: simulationSchema
});

export const simulationExportSchema = simulationRunSchema.extend({
  result: z.object({
    method: z.enum(["floating", "rising"]),
    dropletRadius: z.number(),
    charge: z.number(),
    correctedViscosity: z.number(),
    snapshots: z.array(
      z.object({
        timestamp: z.string(),
        velocity: z.number(),
        position: z.number()
      })
    ),
    meta: z.object({
      plateTop: plateMaterialSchema,
      plateBottom: plateMaterialSchema,
      simSpeed: simSpeedSchema,
      offsetVoltage: z.number(),
      contactPotentialVolt: z.number(),
      effectiveVoltage: z.number(),
      showElectricField: z.boolean(),
      polarity: z.enum(["top-positive", "bottom-positive"])
    })
  })
});

export const quizAnswerSchema = z.object({
  quizId: z.string(),
  answers: z.record(z.string(), z.string())
});
