import * as interfaces from "../interfaces/product.interface.js";
import { prisma } from "../lib/prisma.js";

/**
 * Servicio para crear un nuevo producto
 */

export const createProductService = async (
  productData: interfaces.CreateProductDto,
): Promise<interfaces.ProductServiceResponse> => {
  try {
    const { name, price, description, imageUrl } = productData;

    // 1. Validación de negocio: No queremos productos sin nombre o gratis por error
    if (!name || price === undefined) {
      return {
        error: true,
        status: 400,
        message: "El nombre y el precio son obligatorios",
      };
    }

    if (price < 0) {
      return {
        error: true,
        status: 400,
        message: "El precio no puede ser negativo",
      };
    }

    //2. Creacion en la base de datos

    const newProduct = await prisma.product.create({
      data: {
        name,
        price,
        description,
        imageUrl,
      },
    });

    return {
      error: false,
      status: 201,
      data: newProduct,
    };
  } catch (error) {
    console.error("Error en createProductService:", error);
    return { error: true, status: 500, message: "Error interno del servidor" };
  }
};

/**
 * Servicio para obtener la lista de productos
 */

export const getProductsService =
  async (): Promise<interfaces.ProductServiceResponse> => {
    try {
      // Obtenemos todos los productos. En un caso real, aquí agregaríamos paginación.
      const products = await prisma.product.findMany({
        orderBy: { createdAt: "desc" },
      });

      return { error: false, status: 200, data: products };
    } catch (error) {
      console.log("Error en getProductsService", error);
      return {
        error: true,
        status: 500,
        message: "Error interno al obtener los productos",
      };
    }
  };

// Servicio para actualizar un producto existente
export const updateProductService = async (
  id: string,
  updateData: interfaces.UpdateProductDto,
): Promise<interfaces.ProductServiceResponse> => {
  try {
    //1. Verificamos que el producto exista en la BD
    const existingProduct = await prisma.product.findUnique({
      where: { id },
    });

    if (!existingProduct) {
      return { error: true, status: 404, message: "Producto no encontrado" };
    }

    //2. Ejecutamos la actualizacion, Prisma ignora los campos que vengan vacios
    const updateProduct = await prisma.product.update({
      where: { id },
      data: updateData,
    });

    return { error: false, status: 200, data: updateProduct };

  } catch (error) {
    console.error('Error en updateProductService',error)
    return {error: true, status:500, message:'Error interno al actualizar el producto'}
  }
};
