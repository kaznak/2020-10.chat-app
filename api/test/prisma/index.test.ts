import { PrismaClient, User } from '@prisma/client'

function makeid(length: number) {
  let result = ''
  const characters =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
  const charactersLength = characters.length
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength))
  }
  return result
}

describe('prisma user model', function () {
  const prisma = new PrismaClient()
  const name = makeid(8)
  const password = makeid(8)
  const data = { name, password }
  let addu: User
  let delu: User

  it('connect', async (done) => {
    const ret = await prisma.$connect()
    console.log(ret)
    done()
  })

  it('add a user', async (done) => {
    addu = await prisma.user.create({ data })
    console.log(addu)
    expect(addu.name).toBe(name)
    expect(addu.password).toBe(password)
    done()
  })

  it('delete a user', async (done) => {
    delu = await prisma.user.delete({ where: { id: addu.id } })
    console.log(delu)
    expect(delu.id).toBe(addu.id)
    expect(delu.name).toBe(name)
    expect(delu.password).toBe(password)
    done()
  })

  it('disconnect', async (done) => {
    const ret = await prisma.$disconnect()
    console.log(ret)
    done()
  })
})
