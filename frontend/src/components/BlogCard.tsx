import { Link } from "react-router-dom"

interface BlogCardProps{
    authorName:string,
    title:string,
    content:string,
    publishedDate:string,
    id:number
}

function Circle(){
    return <div className='h-1 w-1 rounded-full bg-slate-200'>
        
    </div>
}


export function Avatar({name}:{name:string}){
    return <div className="relative inline-flex items-center justify-center w-6 h-6 overflow-hidden bg-gray-100 rounded-full dark:bg-gray-600">
    <span className="font-medium text-gray-600 dark:text-gray-300">{name.charAt(0)}</span>
</div>
}


const BlogCard = ({
    authorName,
    title,
    content,
    publishedDate,
    id,
}:BlogCardProps) => {
  return (
    <Link to={`/blog/${id}`}>
    <div className='p-4 border-b border-slate-400 pb-4 w-screen max-w-screen-md'>  
      <div className='flex'>
        <Avatar name={authorName}/>
        <div className='font-thin pl-2 text-sm flex justify-center flex-col'>{authorName}</div>
        <div className='flex justify-center flex-col pl-2'><Circle/></div>
         <div className='font-thin pl-2 text-slate-500 text-sm flex justify-center flex-col'>{publishedDate}</div>
      </div>
      <div className='text-xl font-semibold pt-2'>
        {title}
      </div>
      <div className="text-md font-thin">
        {content.length > 50 ? `${content.slice(0, 50)}...` : content}
      </div>

      <div className='text-sm font-thin text-slate-500 pt-4'>
        {`${Math.ceil(content.length/100)} minutes`}
      </div>
      
    </div>
    </Link>
  )
}

export default BlogCard
