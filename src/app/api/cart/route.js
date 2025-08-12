import clientPromise from '@/lib/dbConnect'

export async function POST(request) {
  try {
    const { productId } = await request.json()
    const client = await clientPromise
    const db = client.db()
    
    // Add to cart or increment quantity
    await db.collection('cart').updateOne(
      { productId },
      { $inc: { quantity: 1 } },
      { upsert: true }
    )
    
    return Response.json({ success: true })
  } catch (error) {
    return Response.json(
      { success: false, error: error.message },
      { status: 500 }
    )
  }
}

export async function GET() {
  try {
    const client = await clientPromise
    const db = client.db()
    const cart = await db.collection('cart').find().toArray()
    return Response.json(cart)
  } catch (error) {
    return Response.json(
      { error: 'Failed to fetch cart', error },
      { status: 500 }
    )
  }
}