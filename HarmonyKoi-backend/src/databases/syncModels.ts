import { Cart } from "~/models/cart.model"
import { CartDetail } from "~/models/cartDetail.model"
import { Element } from "~/models/element.model"
import { KoiFish } from "~/models/koiFish.model"
import { KoiFishElement } from "~/models/koiFishElement.model"
import { New } from "~/models/new.model"
import { Order } from "~/models/order.model"
import { OrderDetail } from "~/models/orderDetail.model"
import { Package } from "~/models/package.model"
import { PatternType } from "~/models/patternType.model"
import { Payment } from "~/models/payment.model"
import { Pond } from "~/models/pond.model"
import { PondElement } from "~/models/pondElement.model"
import { Post } from "~/models/post.model"
import { PostComment } from "~/models/postComment.model"
import { PostKoiFish } from "~/models/postKoiFish.model"
import { PostPond } from "~/models/postPond.model"
import { Reticulation } from "~/models/reticulation.model"
import { User } from "~/models/user.model"
import { UserDetail } from "~/models/userDetail.model"
import { Veriety } from "~/models/veriety.model"

export async function syncModels() {
  try {
    // Sync models in order to avoid foreign key constraints
    await User.sync().then(() => {
      console.log("User table created successfully!")
    })
    await UserDetail.sync().then(() => {
      console.log("UserDetail table created successfully!")
    })
    await Element.sync().then(() => {
      console.log("Element table created successfully!")
    })
    await PatternType.sync().then(() => {
      console.log("PatternType table created successfully!")
    })
    await Reticulation.sync().then(() => {
      console.log("Reticulation table created successfully!")
    })
    await Veriety.sync().then(() => {
      console.log("Veriety table created successfully!")
    })
    await KoiFish.sync().then(() => {
      console.log("KoiFish table created successfully!")
    })
    await Package.sync().then(() => {
      console.log("Package table created successfully!")
    })
    await Post.sync().then(() => {
      console.log("Post table created successfully!")
    })
    await Pond.sync().then(() => {
      console.log("Pond table created successfully!")
    })
    await Cart.sync().then(() => {
      console.log("Cart table created successfully!")
    })
    await Order.sync().then(() => {
      console.log("Order table created successfully!")
    })
    await KoiFishElement.sync().then(() => {
      console.log("KoiFishElement table created successfully!")
    })
    await OrderDetail.sync().then(() => {
      console.log("OrderDetail table created successfully!")
    })
    await CartDetail.sync().then(() => {
      console.log("CartDetail table created successfully!")
    })
    await Payment.sync().then(() => {
      console.log("Payment table created successfully!")
    })
    await New.sync().then(() => {
      console.log("New table created successfully!")
    })
    await PostComment.sync().then(() => {
      console.log("PostComment table created successfully!")
    })
    await PostKoiFish.sync().then(() => {
      console.log("PostKoiFish table created successfully!")
    })
    await PondElement.sync().then(() => {
      console.log("PondElement table created successfully!")
    })
    await PostPond.sync().then(() => {
      console.log("PostPond table created successfully!")
    })
    console.log("Tables synchronized successfully.")
  } catch (error) {
    console.error("Error syncing tables:", error)
    throw error // Ném lỗi để xử lý trong hàm start
  }
}
