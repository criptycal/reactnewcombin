import { createRouter } from "./context";
import { z } from "zod";
import { TRPCError } from "@trpc/server";

export const payablesRouter = createRouter()
    // get all payables
    .query("getAll", {
        async resolve({ ctx }) {
            return await ctx.prisma.payable.findMany();
        }
    })
    // get payable by id
    .query("getById", {
        input: z.object({
            id: z.string(),
        }),
        async resolve({ ctx, input }) {
            const payable = await ctx.prisma.payable.findUnique({
                where: { id: input.id, },
            });
            if (!payable) {
                throw new TRPCError({
                    code: "NOT_FOUND",
                    message: `Payable with id ${input.id} not found`,
                });
            }
        }
    })
    // create payable
    .mutation("add", {

        input: z.object({
            typeService: z.string({
                required_error: "TypeService is required",
                invalid_type_error: "TypeService must be String type"
            }),
            description: z.string({
                required_error: "Description is required",
                invalid_type_error: "Description must be String type"
            }),
            expirationDate: z.date({
                required_error: "ExpirationDate is required",
                invalid_type_error: "ExpirationDate must be Date type"
            }),
            amount: z.number({
                required_error: "Amount is required",
                invalid_type_error: "Amount must be Number type"
            }),

            status: z.string({
                required_error: "Status is required",
                invalid_type_error: "Status must be String type"
            }),
            barcode: z.string({
                required_error: "Barcode is required",
                invalid_type_error: "Barcode must be String type"
            }),
        }),

        async resolve({ ctx, input }) {
            const addPayable = await ctx.prisma.payable.create({
                data: {
                    typeService: input.typeService,
                    description: input.description,
                    expirationDate: input.expirationDate,
                    amount: input.amount,
                    status: input.status,
                    barcode: input.barcode,
                },
            });
            return addPayable;

        },

    })
    // update payable
    .mutation("update", {
        input: z.object({
            id: z.string().cuid(),
            typeService: z.string().optional(),
            description: z.string().optional(),
            expirationDate: z.date().optional(),
            amount: z.number().optional(),
            status: z.string().optional(),
            inputBarcode: z.string().optional(),
        }),
        async resolve({ ctx, input }) {
            const updatePayable = await ctx.prisma.payable.update({
                where: { id: input.id },
                data: {
                    typeService: input.typeService,
                    description: input.description,
                    expirationDate: input.expirationDate,
                    amount: input.amount,
                    status: input.status,
                    barcode: input.inputBarcode,
                },
            });
            return updatePayable;
        }
    })
    // delete payable
    .mutation("delete", {
        input: z.object({
            id: z.string().cuid(),
        }),
        async resolve({ ctx, input }) {
            const deletePayable = await ctx.prisma.payable.delete({
                where: { id: input.id },
            });
            return deletePayable;
        }
    })
    // get payable by typeService
    .query("getByTypeService", {
        input: z.object({
            typeService: z.string(),
        }),
        async resolve({ ctx, input }) {
            const payable = await ctx.prisma.payable.findMany({
                where: { typeService: input.typeService, },
            });
            if (!payable) {
                throw new TRPCError({
                    code: "NOT_FOUND",
                    message: `Payable with typeService ${input.typeService} not found`,
                });
            }
            return payable;
        }
    })
