import { createBlogInput, updateBlogInput } from '@chakbindra/common-medium';
import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'
import { Hono } from "hono";
import { verify } from 'hono/jwt';


export const blogRouter=new Hono<{
    Bindings:{
      DATABASE_URL:string,
      JWT_SECRET:string
    };
    Variables: {
        userId: string; 
    };
  }>();


blogRouter.use('/*',async (c,next)=>{
    //extract the userid
    //pass it down to the route  handler
    const authHeader=c.req.header("Authorization")||"";
    const user=await verify(authHeader,c.env.JWT_SECRET) as {id:string}||null;
    if(!user){
        c.status(403);
        return c.json({
            message:"You are not logged in"
        })
    }
    c.set("userId",user.id);
    await next();
})

//pagination
blogRouter.post('/',async (c) => {
    const body=await c.req.json();
    const{success}=createBlogInput.safeParse(body);
    if(!success){
        c.status(411);
        return c.json({
            message:"incorrect inputs"
        })
    }
    const authorId=c.get("userId");
    console.log(authorId);
    const prisma=new PrismaClient({
        datasourceUrl:c.env.DATABASE_URL,
    }).$extends(withAccelerate())

    const blog=await prisma.blog.create({
        data:{
            title:body.title,
            content:body.content,
            authorId:Number(authorId)
        }
    })

    return c.json({
        id:blog.id
    })
})

blogRouter.put('/', async (c) => {
    const body=await c.req.json();
    const{success}=updateBlogInput.safeParse(body);
    if(!success){
        c.status(403);
        c.json({
            message:"invalid inputs"
        })
    }
    const prisma=new PrismaClient({
        datasourceUrl:c.env.DATABASE_URL,
    }).$extends(withAccelerate())

    const blog=await prisma.blog.update({
        where:{
            id:body.id,
        },
        data:{
            title:body.title,
            content:body.content,
        }
    })

    return c.json({
        id:blog.id
    })
})

blogRouter.get('/bulk',async (c) => {
    const prisma=new PrismaClient({
        datasourceUrl:c.env.DATABASE_URL,
    }).$extends(withAccelerate())
    const blogs=await prisma.blog.findMany();
    return c.json({
        blogs
    })
})

blogRouter.get('/:id',async (c) => {
    const id=c.req.param("id");
    const prisma=new PrismaClient({
        datasourceUrl:c.env.DATABASE_URL,
    }).$extends(withAccelerate())
    try{
        const blog=await prisma.blog.findFirst({
            where:{
                id:Number(id),
            }
        })
        return c.json({
            blog
        })
    }catch(e){
        c.status(403);
        return c.json({
            message:"Error while fetching blog post"
        })
    }
})

