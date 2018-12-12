"use strict";
const db = require("../models");
module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.bulkInsert(
            "products",
            [
                {
                    title: "Sport Patriot Mocha",
                    imageUrl: "https://s3.amazonaws.com/boots-img-stuff/product-1.jpg",
                    description: "The basic boot you can't live without!  If you do... ya basic!",
                    price: 189.95,
                    createdAt: Sequelize.literal("NOW()"),
                    updatedAt: Sequelize.literal("NOW()"),
                },
                {
                    title: "Lucchese Men's Olive Burnish ",
                    imageUrl: "https://s3.amazonaws.com/boots-img-stuff/product-2.jpg",
                    description: "Cortez is a horseman boot constructed with oil waxy Comanche leather and an all-new stirrup construction.",
                    price: 200.37,
                    createdAt: Sequelize.literal("NOW()"),
                    updatedAt: Sequelize.literal("NOW()")
                },
                {
                    title: "Lucchese Men's Brown Burnish",
                    imageUrl: "https://s3.amazonaws.com/boots-img-stuff/product-3.jpg",
                    description: "Lucchese 1883 is made to represent the year that Lucchese was founded. ",
                    price: 549.99,
                    createdAt: Sequelize.literal("NOW()"),
                    updatedAt: Sequelize.literal("NOW()")
                },
                {
                    title: "Bent Rail Men's Brushed Tan",
                    imageUrl: "https://s3.amazonaws.com/boots-img-stuff/product-4.jpg",
                    description: "It's all about the boots, and it's all about the music! New from Justin, the Bent Rail Collection",
                    price: 219.99,
                    createdAt: Sequelize.literal("NOW()"),
                    updatedAt: Sequelize.literal("NOW()")
                },
                {
                    title: "Cognac Damiana & Bone Performance ",
                    imageUrl: "https://s3.amazonaws.com/boots-img-stuff/product-5.jpg",
                    description: "It's all about the boots, and it's all about the music! New from Justin, the Bent Rail Collection.",
                    price: 219.99,
                    createdAt: Sequelize.literal("NOW()"),
                    updatedAt: Sequelize.literal("NOW()")
                },
                {
                    title: "Old Gringo Women's Chocolate Lizard ",
                    imageUrl: "https://s3.amazonaws.com/boots-img-stuff/product-6.jpg",
                    description: "Because you have the confidence to pull this off!",
                    price: 300.50,
                    createdAt: Sequelize.literal("NOW()"),
                    updatedAt: Sequelize.literal("NOW()")
                },
                {
                    title: "Women's Dolly Rustic Beige",
                    imageUrl: "https://s3.amazonaws.com/boots-img-stuff/product-7.jpg",
                    description: "Old Gringo presents these Dolly rustic beige western heel boots.",
                    price: 469.99,
                    createdAt: Sequelize.literal("NOW()"),
                    updatedAt: Sequelize.literal("NOW()")
                },
                {
                    title: "Mountain Kids Antique Mocha",
                    imageUrl: "https://s3.amazonaws.com/boots-img-stuff/product-8.jpg",
                    description: "Your little cowgirl will have fun playing in the mud in these snip toe boots.",
                    price: 62.99,
                    createdAt: Sequelize.literal("NOW()"),
                    updatedAt: Sequelize.literal("NOW()")
                },
                {
                    title: "Girl's Vintage Corona Calf",
                    imageUrl: "https://s3.amazonaws.com/boots-img-stuff/product-9.jpg",
                    description: "Old West provides comfort and style as always with these vintage cowboy boots.",
                    price: 49.88,
                    createdAt: Sequelize.literal("NOW()"),
                    updatedAt: Sequelize.literal("NOW()")
                },
                {
                    title: "Children's Natural White",
                    imageUrl: "https://s3.amazonaws.com/boots-img-stuff/product-10.jpg",
                    description: "Keep your child in style when you slide on these Laredo natural white.",
                    price: 29.99,
                    createdAt: Sequelize.literal("NOW()"),
                    updatedAt: Sequelize.literal("NOW()")
                },
                {
                    title: "Childrens Roper Boots",
                    imageUrl: "https://s3.amazonaws.com/boots-img-stuff/product-11.jpg",
                    description: "It's never too early to dress your child in a pair of Cavender's Ropers.",
                    price: 29.88,
                    createdAt: Sequelize.literal("NOW()"),
                    updatedAt: Sequelize.literal("NOW()")
                },
                {
                    title: "Youth Tan Brown Corona",
                    imageUrl: "https://s3.amazonaws.com/boots-img-stuff/product-12.jpg",
                    description: "Another boot in the Old West collection,this time an all-over antiqued Tan Brown Corona.",
                    price: 53.99,
                    createdAt: Sequelize.literal("NOW()"),
                    updatedAt: Sequelize.literal("NOW()")
                },
                {
                    title: "Antiqued Grey Tycoon",
                    imageUrl: "https://s3.amazonaws.com/boots-img-stuff/product-13.jpg",
                    description: "The Tycoon is a dependable performance boot with top-tier materials and design. ",
                    price: 219.99,
                    createdAt: Sequelize.literal("NOW()"),
                    updatedAt: Sequelize.literal("NOW()")
                },
                {
                    title: "Range Boss Trusty Brown",
                    imageUrl: "https://s3.amazonaws.com/boots-img-stuff/product-14.jpg",
                    description: "Ariat presents their Range Boss western wide square toe boot with premium full-grain.",
                    price: 189.99,
                    createdAt: Sequelize.literal("NOW()"),
                    updatedAt: Sequelize.literal("NOW()")
                }
            ],
            {}
        );
    },

    down: (queryInterface, Sequelize) => {
        return queryInterface.bulkDelete("products", null, {});
    }
};
