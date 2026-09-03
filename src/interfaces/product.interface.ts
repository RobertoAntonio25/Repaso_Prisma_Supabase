// DTO (Data Transfer Object) para la creación del producto
export interface CreateProductDto {
  name: string;
  price: number;
  description: string;
  imageUrl: string;
}

export type UpdateProductDto = Partial<CreateProductDto>; // Permite actualizar solo algunos campos del producto

export interface ProductServiceResponse {
  error: boolean;
  status: number;
  message?: string;
  data?: any; // Aquí viajarán los productos o el producto creado
}
