import { NextResponse } from 'next/server'

export async function POST(req) {
  // Langsung kembalikan respons sukses tanpa memproses apa pun.
  console.info('API call ke submit-bookmark diterima, mengembalikan respons dummy.')
  return NextResponse.json({ message: 'Bookmark submitted successfully (dummy response).' }, { status: 200 })
}
