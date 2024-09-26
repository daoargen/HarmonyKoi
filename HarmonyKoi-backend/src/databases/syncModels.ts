import { User } from "~/models/user.model"
import { UserDetail } from "~/models/userDetail.model"

export async function syncModels() {
  try {
    await User.sync().then(() => {
      console.log("User table created successfully!")
    })
    await UserDetail.sync().then(() => {
      console.log("UserDetail table created successfully!")
    })
    console.log("Tables synchronized successfully.")
  } catch (error) {
    console.error("Error syncing tables:", error)
    throw error
  }
}
