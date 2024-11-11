import cron from "node-cron"

import orderService from "~/services/order.service"

const cronExpression = "*/5 * * * *"

export const initializeSchedulers = () => {
  cron.schedule(cronExpression, () => {
    orderService.cancelPendingOrders()
  })
}
