const mongoose = require('mongoose');
const dotenv = require('dotenv');
const bcrypt = require('bcryptjs');
const User = require('./models/User');
const Category = require('./models/Category');
const Product = require('./models/Product');

dotenv.config();

const categories = [
    { category: 'Fruits & Vegetables', description: 'Fresh fruits and vegetables' },
    { category: 'Dairy & Eggs', description: 'Milk, cheese, eggs and dairy products' },
    { category: 'Bakery', description: 'Fresh bread, cakes and pastries' },
    { category: 'Beverages', description: 'Juices, soft drinks, tea and coffee' },
    { category: 'Snacks', description: 'Chips, cookies, nuts and snacks' },
    { category: 'Grains & Cereals', description: 'Rice, wheat, oats and cereals' },
    { category: 'Meat & Seafood', description: 'Fresh meat, chicken and seafood' },
    { category: 'Frozen Foods', description: 'Frozen meals, ice cream and frozen items' },
];

const seedDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('MongoDB Connected for seeding');

        // Clear existing data
        await User.deleteMany();
        await Category.deleteMany();
        await Product.deleteMany();

        // Create admin user
        const adminUser = await User.create({
            firstname: 'Admin',
            lastname: 'User',
            username: 'admin',
            email: 'admin@grocery.com',
            password: 'admin123',
            isAdmin: true,
        });
        console.log('Admin user created: admin@grocery.com / admin123');

        // Create regular user
        const regularUser = await User.create({
            firstname: 'John',
            lastname: 'Doe',
            username: 'johndoe',
            email: 'john@example.com',
            password: 'password123',
            isAdmin: false,
        });
        console.log('Regular user created: john@example.com / password123');

        // Create categories
        const createdCategories = await Category.insertMany(categories);
        console.log(`${createdCategories.length} categories created`);

        // Category references
        const fruits = createdCategories[0]._id;
        const dairy = createdCategories[1]._id;
        const bakery = createdCategories[2]._id;
        const beverages = createdCategories[3]._id;
        const snacks = createdCategories[4]._id;
        const grains = createdCategories[5]._id;
        const meat = createdCategories[6]._id;
        const frozen = createdCategories[7]._id;

        const products = [
            // === FRUITS & VEGETABLES (8 items) ===
            { name: 'Fresh Bananas', description: 'Ripe yellow bananas, perfect for smoothies and snacking. Rich in potassium and vitamins B6 & C.', price: 2.49, image: 'https://images.unsplash.com/photo-1603833665858-e61d17a86224?w=400&h=300&fit=crop', category: fruits, countInStock: 150, rating: 4.5, numReviews: 12 },
            { name: 'Organic Apples', description: 'Crisp and sweet organic Fuji apples. Locally sourced from certified organic farms.', price: 3.99, image: 'https://images.unsplash.com/photo-1619546813926-a78fa6372cd2?w=400&h=300&fit=crop', category: fruits, countInStock: 200, rating: 4.8, numReviews: 24 },
            { name: 'Baby Spinach', description: 'Tender baby spinach leaves, triple-washed and ready to eat. Perfect for salads and smoothies.', price: 2.99, image: 'https://images.unsplash.com/photo-1574316071802-0d684efa7bf5?w=400&h=300&fit=crop', category: fruits, countInStock: 80, rating: 4.3, numReviews: 8 },
            { name: 'Ripe Tomatoes', description: 'Vine-ripened red tomatoes with rich flavor. Great for salads, sauces, and cooking.', price: 1.99, image: 'https://images.unsplash.com/photo-1592924357228-91a4daadcfea?w=400&h=300&fit=crop', category: fruits, countInStock: 120, rating: 4.2, numReviews: 15 },
            { name: 'Hass Avocados', description: 'Perfectly ripe Hass avocados. Creamy and delicious for guacamole, toast, or salads.', price: 4.99, image: 'https://images.unsplash.com/photo-1523049673857-eb18f1d7b578?w=400&h=300&fit=crop', category: fruits, countInStock: 70, rating: 4.7, numReviews: 33 },
            { name: 'Fresh Strawberries', description: 'Juicy red strawberries, hand-picked at peak ripeness. Sweet and perfect for desserts.', price: 4.49, image: 'https://images.unsplash.com/photo-1464965911861-746a04b4bca6?w=400&h=300&fit=crop', category: fruits, countInStock: 60, rating: 4.6, numReviews: 28 },
            { name: 'Sweet Oranges', description: 'Navel oranges packed with vitamin C. Sweet, juicy, and seedless.', price: 3.49, image: 'https://images.unsplash.com/photo-1547514701-42782101795e?w=400&h=300&fit=crop', category: fruits, countInStock: 90, rating: 4.4, numReviews: 19 },
            { name: 'Fresh Broccoli', description: 'Crisp green broccoli crowns. High in fiber, vitamins K and C. Steam, roast, or stir-fry.', price: 2.79, image: 'https://images.unsplash.com/photo-1584270354949-c26b0d5b4a0c?w=400&h=300&fit=crop', category: fruits, countInStock: 55, rating: 4.1, numReviews: 11 },

            // === DAIRY & EGGS (6 items) ===
            { name: 'Whole Milk', description: 'Farm-fresh whole milk. Rich, creamy, and from grass-fed cows. 1 gallon.', price: 4.49, image: 'https://images.unsplash.com/photo-1550583724-b2692b85b150?w=400&h=300&fit=crop', category: dairy, countInStock: 60, rating: 4.6, numReviews: 30 },
            { name: 'Free Range Eggs', description: 'One dozen large free-range eggs. From happy hens raised in open pastures.', price: 5.99, image: 'https://images.unsplash.com/photo-1506976785307-8732e854ad03?w=400&h=300&fit=crop', category: dairy, countInStock: 90, rating: 4.7, numReviews: 22 },
            { name: 'Greek Yogurt', description: 'Thick and creamy Greek yogurt with live probiotics. High protein, low fat.', price: 3.49, image: 'https://images.unsplash.com/photo-1571212515416-fef01fc43637?w=400&h=300&fit=crop', category: dairy, countInStock: 45, rating: 4.4, numReviews: 18 },
            { name: 'Cheddar Cheese Block', description: 'Sharp cheddar cheese aged 12 months. Perfect for sandwiches, crackers, and cooking.', price: 6.49, image: 'https://images.unsplash.com/photo-1618164436241-4473940d1f5c?w=400&h=300&fit=crop', category: dairy, countInStock: 40, rating: 4.5, numReviews: 14 },
            { name: 'Salted Butter', description: 'Premium salted butter made from fresh cream. Perfect for baking and cooking.', price: 4.99, image: 'https://images.unsplash.com/photo-1589985270826-4b7bb135bc9d?w=400&h=300&fit=crop', category: dairy, countInStock: 50, rating: 4.3, numReviews: 16 },
            { name: 'Fresh Cream', description: 'Heavy whipping cream for cooking, baking, and making whipped cream. Fresh daily.', price: 3.99, image: 'https://images.unsplash.com/photo-1563729784474-d77dbb933a9e?w=400&h=300&fit=crop', category: dairy, countInStock: 35, rating: 4.2, numReviews: 9 },

            // === BAKERY (5 items) ===
            { name: 'Sourdough Bread', description: 'Artisan sourdough bread baked fresh daily. Crunchy crust with a soft, tangy interior.', price: 5.49, image: 'https://images.unsplash.com/photo-1549931319-a545dcf3bc73?w=400&h=300&fit=crop', category: bakery, countInStock: 30, rating: 4.9, numReviews: 40 },
            { name: 'Chocolate Croissants', description: 'Flaky butter croissants filled with rich Belgian dark chocolate. Baked fresh every morning.', price: 3.99, image: 'https://images.unsplash.com/photo-1530610476181-d83430b64dcd?w=400&h=300&fit=crop', category: bakery, countInStock: 25, rating: 4.8, numReviews: 35 },
            { name: 'Whole Wheat Bread', description: 'Nutritious 100% whole wheat bread. High in fiber, no artificial preservatives.', price: 3.99, image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=400&h=300&fit=crop', category: bakery, countInStock: 40, rating: 4.3, numReviews: 20 },
            { name: 'Blueberry Muffins', description: 'Moist blueberry muffins made with real blueberries. Pack of 4. Perfect morning treat.', price: 4.49, image: 'https://images.unsplash.com/photo-1607958996333-41aef7caefaa?w=400&h=300&fit=crop', category: bakery, countInStock: 20, rating: 4.6, numReviews: 25 },
            { name: 'Cinnamon Rolls', description: 'Soft, fluffy cinnamon rolls with cream cheese frosting. Pack of 6. Irresistible!', price: 5.99, image: 'https://images.unsplash.com/photo-1583338917451-face2751d8d5?w=400&h=300&fit=crop', category: bakery, countInStock: 15, rating: 4.7, numReviews: 31 },

            // === BEVERAGES (5 items) ===
            { name: 'Fresh Orange Juice', description: '100% fresh-squeezed orange juice. No added sugar, no preservatives. 1 liter bottle.', price: 6.99, image: 'https://images.unsplash.com/photo-1600271886742-f049cd451bba?w=400&h=300&fit=crop', category: beverages, countInStock: 40, rating: 4.5, numReviews: 20 },
            { name: 'Green Tea Pack', description: 'Premium Japanese Sencha green tea bags. 20 individually wrapped sachets. Rich in antioxidants.', price: 7.99, image: 'https://images.unsplash.com/photo-1627435601361-ec25f5b1d0e5?w=400&h=300&fit=crop', category: beverages, countInStock: 70, rating: 4.6, numReviews: 15 },
            { name: 'Cold Brew Coffee', description: 'Smooth cold brew coffee concentrate. Low acidity, rich flavor. Just add water or milk.', price: 8.99, image: 'https://images.unsplash.com/photo-1461023058943-07fcbe16d735?w=400&h=300&fit=crop', category: beverages, countInStock: 30, rating: 4.7, numReviews: 22 },
            { name: 'Coconut Water', description: 'Pure coconut water, naturally refreshing. No added sugars. Hydrating and nutritious.', price: 3.49, image: 'https://images.unsplash.com/photo-1625772299848-391b6a87d7b3?w=400&h=300&fit=crop', category: beverages, countInStock: 55, rating: 4.3, numReviews: 17 },
            { name: 'Berry Smoothie Mix', description: 'Frozen berry smoothie mix — strawberries, blueberries, raspberries. Just blend and enjoy!', price: 5.99, image: 'https://images.unsplash.com/photo-1553530666-ba11a7da3888?w=400&h=300&fit=crop', category: beverages, countInStock: 35, rating: 4.4, numReviews: 13 },

            // === SNACKS (5 items) ===
            { name: 'Mixed Nuts', description: 'Roasted mixed nuts — almonds, cashews, walnuts, and pecans. Lightly salted. 500g pack.', price: 8.99, image: 'https://images.unsplash.com/photo-1599599810694-b5b37304c041?w=400&h=300&fit=crop', category: snacks, countInStock: 55, rating: 4.7, numReviews: 28 },
            { name: 'Potato Chips', description: 'Crispy kettle-cooked potato chips with Himalayan pink salt. Irresistibly crunchy. 200g bag.', price: 3.49, image: 'https://images.unsplash.com/photo-1621447504864-d8686e12698c?w=400&h=300&fit=crop', category: snacks, countInStock: 100, rating: 4.1, numReviews: 45 },
            { name: 'Dark Chocolate Bar', description: '72% cacao dark chocolate. Smooth, rich, and slightly bitter. Fair trade certified.', price: 4.99, image: 'https://images.unsplash.com/photo-1481391319762-47dff72954d9?w=400&h=300&fit=crop', category: snacks, countInStock: 65, rating: 4.8, numReviews: 37 },
            { name: 'Granola Bars', description: 'Oat & honey granola bars with dried cranberries. Box of 8. Great on-the-go snack.', price: 5.49, image: 'https://images.unsplash.com/photo-1558961363-fa8fdf82db35?w=400&h=300&fit=crop', category: snacks, countInStock: 45, rating: 4.2, numReviews: 19 },
            { name: 'Trail Mix', description: 'Energy-packed trail mix with raisins, peanuts, sunflower seeds, and M&Ms. 400g bag.', price: 6.49, image: 'https://images.unsplash.com/photo-1607282507080-1245e9cd4e45?w=400&h=300&fit=crop', category: snacks, countInStock: 40, rating: 4.5, numReviews: 23 },

            // === GRAINS & CEREALS (4 items) ===
            { name: 'Basmati Rice', description: 'Premium aged basmati rice. Extra long grain, fluffy and aromatic. 5kg bag.', price: 9.99, image: 'https://images.unsplash.com/photo-1586201375761-83865001e31c?w=400&h=300&fit=crop', category: grains, countInStock: 80, rating: 4.8, numReviews: 32 },
            { name: 'Organic Oats', description: 'Steel-cut organic oats. Heart-healthy breakfast choice. Rich in fiber and protein. 1kg pack.', price: 4.99, image: 'https://images.unsplash.com/photo-1517673400267-0251440c45dc?w=400&h=300&fit=crop', category: grains, countInStock: 65, rating: 4.5, numReviews: 19 },
            { name: 'Quinoa', description: 'Organic white quinoa. Complete protein source with all 9 essential amino acids. 500g bag.', price: 7.49, image: 'https://images.unsplash.com/photo-1586201375761-83865001e31c?w=400&h=300&fit=crop', category: grains, countInStock: 35, rating: 4.6, numReviews: 14 },
            { name: 'Penne Pasta', description: 'Premium Italian durum wheat penne pasta. Bronze-cut for better sauce adhesion. 500g pack.', price: 2.99, image: 'https://images.unsplash.com/photo-1551462147-ff29053bfc14?w=400&h=300&fit=crop', category: grains, countInStock: 90, rating: 4.3, numReviews: 21 },

            // === MEAT & SEAFOOD (4 items) ===
            { name: 'Chicken Breast', description: 'Boneless skinless chicken breast. Hormone-free, fresh and lean. 1kg pack.', price: 8.99, image: 'https://images.unsplash.com/photo-1587593810167-a84920ea0781?w=400&h=300&fit=crop', category: meat, countInStock: 40, rating: 4.4, numReviews: 26 },
            { name: 'Atlantic Salmon', description: 'Wild-caught Atlantic salmon fillet. Rich in omega-3 fatty acids. 500g.', price: 12.99, image: 'https://images.unsplash.com/photo-1574781330855-d0db8cc6a79c?w=400&h=300&fit=crop', category: meat, countInStock: 25, rating: 4.9, numReviews: 21 },
            { name: 'Ground Beef', description: 'Lean ground beef, 90% lean. Perfect for burgers, tacos, and bolognese. 500g.', price: 7.99, image: 'https://images.unsplash.com/photo-1602470520998-f4a52199a3d6?w=400&h=300&fit=crop', category: meat, countInStock: 35, rating: 4.3, numReviews: 18 },
            { name: 'Jumbo Shrimp', description: 'Fresh jumbo shrimp, peeled and deveined. Ready to cook. 500g pack.', price: 11.99, image: 'https://images.unsplash.com/photo-1565680018434-b513d5e5fd47?w=400&h=300&fit=crop', category: meat, countInStock: 20, rating: 4.6, numReviews: 15 },

            // === FROZEN FOODS (5 items) ===
            { name: 'Vanilla Ice Cream', description: 'Premium vanilla bean ice cream. Made with real Madagascar vanilla. 1 pint.', price: 6.49, image: 'https://images.unsplash.com/photo-1497034825429-c343d7c6a68f?w=400&h=300&fit=crop', category: frozen, countInStock: 35, rating: 4.6, numReviews: 38 },
            { name: 'Frozen Pizza', description: 'Wood-fired style Margherita pizza with mozzarella, tomato sauce, and fresh basil.', price: 7.99, image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?w=400&h=300&fit=crop', category: frozen, countInStock: 50, rating: 4.3, numReviews: 27 },
            { name: 'Frozen Mixed Vegetables', description: 'Blend of peas, carrots, corn, and green beans. Flash-frozen for freshness. 1kg bag.', price: 3.99, image: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?w=400&h=300&fit=crop', category: frozen, countInStock: 60, rating: 4.1, numReviews: 16 },
            { name: 'Chicken Nuggets', description: 'Crispy breaded chicken nuggets. Made with 100% chicken breast meat. Family pack of 40.', price: 8.49, image: 'https://images.unsplash.com/photo-1562967914-608f82629710?w=400&h=300&fit=crop', category: frozen, countInStock: 30, rating: 4.4, numReviews: 29 },
            { name: 'Frozen Berries Mix', description: 'Premium frozen berry mix — strawberries, blueberries, raspberries, and blackberries. 1kg.', price: 7.49, image: 'https://images.unsplash.com/photo-1488459716781-31db52582fe9?w=400&h=300&fit=crop', category: frozen, countInStock: 25, rating: 4.5, numReviews: 20 },
        ];

        const createdProducts = await Product.insertMany(products);
        console.log(`${createdProducts.length} products created`);
        console.log('\nSeed complete!');
        process.exit(0);
    } catch (error) {
        console.error(`Error: ${error.message}`);
        process.exit(1);
    }
};

seedDB();
