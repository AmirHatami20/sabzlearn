const categoryModel = require("../models/category");

module.exports = {
    createCategory: async (req, res) => {
        const {title, name} = req.body;

        try {
            const newCategory = await categoryModel.create({
                title,
                name
            });

            return res.status(201).json(newCategory);

        } catch (err) {
            return res.status(400).json({
                success: false,
                message: err.message,
            })
        }
    },
    getAllCategory: async (req, res) => {
        try {
            const allCategoriesWithCourse = await categoryModel.aggregate([
                {
                    $lookup: {
                        from: 'courses',
                        let: {category: '$_id'},
                        pipeline: [
                            {
                                $match: {
                                    $expr: {$eq: ['$category', '$$category']}
                                }
                            },
                            {
                                $project: {
                                    _id: 1,
                                    name: 1,
                                    shortName: 1,
                                }
                            }
                        ],
                        as: 'courses'
                    }
                }
            ]);

            res.status(200).json(allCategoriesWithCourse);

        } catch
            (err) {
            return res.status(400).json({
                success: false,
                message: err.message,
            })
        }
    },
    updateCategory: async (req, res) => {
        const {title} = req.body;
        const {id} = req.params;

        const updatedCategory = await categoryModel.findByIdAndUpdate(id, {title});

        if (!updatedCategory) {
            return res.status(404).json({
                success: false,
                message: "Category Not Found!"
            });
        }

        return res.json(updatedCategory);
    },
    deleteCategory:
        async (req, res) => {
            const deletedCategory = await categoryModel.findByIdAndDelete(req.params.id);

            if (!deletedCategory) {
                return res.status(404).json({
                    success: false,
                    message: "Category Not Found!"
                });
            }

            return res.json(deletedCategory);
        },
}