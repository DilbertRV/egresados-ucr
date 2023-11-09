export async function getUser(supabase, session) {
  const { data: usuario, error } = await supabase
    .from("usuario")
    .select("*")
    .eq("id_usuario", session.user.id)
    .single();

    console.log(usuario);

  if (error) {
    throw new Error("Error al obtener los datos del usuario");
  }

  return usuario;
}

// export async function getUserRole(supabase, id_usuario) {
//   const { data: id_rol, error } = await supabase
//     .from("rol_usuario")
//     .select("id_rol")
//     .eq("id_usuario", id_usuario)
//     .single();

//   if (error) {
//     throw new Error("Error al obtener el rol del usuario");
//   }

//   return id_rol;
// }