import * as productServices from "../services/product.service.js";
export const createProduct = async (req, res) => {
    // Pasamos el req.body al servicio
    const result = await productServices.createProductService(req.body);
    if (result.error) {
        res.status(result.status).json({ message: result.message });
    }
    res.status(result.status).json({
        message: "Producto creado exitosamente",
        product: result.data,
    });
};
export const getAllProducts = async (req, res) => {
    const result = await productServices.getProductsService();
    if (result.error) {
        res.status(result.status).json({
            message: result.message,
        });
        return;
    }
    res.status(result.status).json({
        products: result.data,
    });
};
export const updateProduct = async (req, res) => {
    //1.Extraemos el ID de la URL (req.params)
    const { id } = req.params;
    //2. Extraemos los datos a actualizar del cuerpo de la peticion(req.body)
    const updateData = req.body;
    //3. Delegamos el trabjo al servicio
    const result = await productServices.updateProductService(id, updateData);
    if (result.error) {
        res.status(result.status).json({ message: result.message });
        return;
    }
    res.status(result.status).json({
        message: "Producto actualizado exitosamente",
        product: result.data,
    });
};
