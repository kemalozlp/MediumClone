import { createClient } from "@/utils/supabase/server";
import LikeBtnPost from "@/app/likebtn/like";
import Favorites from "@/app/favoritesform/favori";
import "./postdetail.css"
import CommentSide from "@/app/(comments)/commentside/commentside";
export default async function PostDetail({ params }) {
  const id = Number(params.id);
  const supabase = createClient();
  const { data: { user } } = await supabase.auth.getUser();
  let { data: posts } = await supabase
    .from('posts')
    .select('*')
    .eq("id", id)

  console.log(posts + "asdasd");



  let { data: comments } = await supabase
    .from('comments')
    .select('*')

  let { data: commentsid } = await supabase
    .from('comments')
    .select('*')
    .eq("post_id", id)
  console.log(commentsid + "  asd12312312");


  return (
    <div className="postList">
      {
        posts ? posts.map((x, i) => (
          <div className="postItem">
            <h4> <span>{user?.email[0]}</span> {user?.email}</h4>
            <h1>{x.title}</h1>
            <p>{x.content}</p>
            <div className="postBtns">
              <LikeBtnPost id={x.id} />
              <CommentSide id={id} commentslength={comments.length} commentsid={commentsid} user={user} />
              <Favorites id={x.id} />
            </div>
          </div>
        )) : ""
      }

    </div>
  )
}
