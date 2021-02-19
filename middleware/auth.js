export default function({route,store,$fire,redirect}){
    $fire.auth.onAuthStateChanged(user=>{
        if(!user){
            redirect('/login')
        }
    })
}