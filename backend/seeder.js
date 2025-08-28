const mongoose = require("mongoose");
const User = require("./models/User");
require("dotenv").config();

const seedDatabase = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log("Connected to MongoDB for seeding...");

    // Check if super admin already exists
    const existingAdmin = await User.findOne({ role: "super_admin" });

    if (existingAdmin) {
      console.log("Super admin already exists:", existingAdmin.email);
      process.exit(0);
    }

    // Create super admin user
    const superAdmin = await User.create({
      firstName: "Super",
      lastName: "Admin",
      email: "admin@saaspos.com",
      password: "Admin123!",
      role: "super_admin",
      companyName: "SaaS POS System",
      isActive: true,
      isEmailVerified: true,
    });

    console.log("Super admin created successfully:");
    console.log("Email:", superAdmin.email);
    console.log("Password: Admin123!");
    console.log("Role:", superAdmin.role);

    // Create a test manager user
    const manager = await User.create({
      firstName: "Test",
      lastName: "Manager",
      email: "manager@saaspos.com",
      password: "Manager123!",
      role: "manager",
      companyName: "Test Company",
      isActive: true,
      isEmailVerified: true,
    });

    console.log("\nTest manager created successfully:");
    console.log("Email:", manager.email);
    console.log("Password: Manager123!");
    console.log("Role:", manager.role);

    console.log("\n✅ Database seeded successfully!");
    process.exit(0);
  } catch (error) {
    console.error("Error seeding database:", error);
    process.exit(1);
  }
};

// Delete all users and reseed
const reseedDatabase = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log("Connected to MongoDB for reseeding...");

    // Delete all users
    await User.deleteMany({});
    console.log("Deleted all existing users");

    // Seed fresh data
    await seedDatabase();
  } catch (error) {
    console.error("Error reseeding database:", error);
    process.exit(1);
  }
};

// Check command line arguments
const args = process.argv.slice(2);

if (args.includes("--fresh") || args.includes("-f")) {
  reseedDatabase();
} else {
  seedDatabase();
}
