// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

export default (req, res) => {
  res.status = 400
  res.json({ name: 'John Doe' })
}
