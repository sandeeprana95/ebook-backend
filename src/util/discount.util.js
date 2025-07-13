const discountedPrice = (price,discount)=>{
    const total = (price-(price * discount)/100)
    return total
}

export default discountedPrice
