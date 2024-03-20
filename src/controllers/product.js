import Product from '../model/product'
export const getProduct = async (req, res) => {
    try {
        const data = await Product.find()
        if (data.length < 0) {
            return res.status(404).json({ message: "No  product found" })
        }
        res.status(201).json(data);
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

export const getProductById = async (req, res) => {
    try {
        const data = await Product.findOne({ _id: req.params.id });
        if (data.length < 0) {
            return res.status(404).json({ message: "No product found" });
        }
        res.status(201).json(data)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

export const addProduct = async (req, res) => {
    try {
        const data = await Product(req.body).save();
        res.status(201).json(data)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

export const updateProduct = async (req, res) => {
    try {
        const data = await Product.findOneAndUpdate({ _id: req.params.id }, req.body, { new: true, });
        res.status(201).json(data)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

export const removeProduct = async (req, res) => {
    try {
        const data = await Product.findOneAndDelete({ _id: req.params.id })
        if (data.length < 0) {
            return res.status(201).json({ message: "No product found" });
        }
        res.status(201).json(data);
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

