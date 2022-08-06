interface OrderCreate {
  order: {
    userId: number,
    products: Array<number>
  }
}

export default OrderCreate;