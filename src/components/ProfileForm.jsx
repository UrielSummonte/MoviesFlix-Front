// import { useState } from "react"
// import { useForm } from "react-hook-form"
// import { yupResolver } from "@hookform/resolvers/yup"
// import * as yup from "yup"

// const profileSchema = yup
//   .object({
//     name: yup.string().required("El nombre es obligatorio").max(30, "El nombre debe tener máximo 30 caracteres"),
//     type: yup
//       .string()
//       .required("El tipo de perfil es obligatorio")
//       .oneOf(["adult", "teen", "child"], "Tipo de perfil inválido"),
//     avatar: yup.string().nullable(),
//   })
//   .required()

// const ProfileForm = ({ profile = null, onSubmit, buttonText = "Guardar" }) => {
//   const [avatarPreview, setAvatarPreview] = useState(profile?.avatar || "")
  
//   const {
//     register,
//     handleSubmit,
//     formState: { errors },
//   } = useForm({
//     resolver: yupResolver(profileSchema),
//     defaultValues: {
//       name: profile?.name || "",
//       type: profile?.type || "adult",
//       avatar: profile?.avatar || "",
//     },
//   })

//   const handleAvatarChange = (e) => {
//     setAvatarPreview(e.target.value)
//   }

//   return (
//     <form
//       onSubmit={handleSubmit(onSubmit)}
//       className="max-w-md mx-auto p-6 bg-gray-800 rounded-2xl shadow-lg space-y-6"
//     >
//       <h2 className="text-2xl font-semibold text-white text-center">Crear Perfil</h2>

//       <div>
//         <label htmlFor="name" className="block text-sm font-medium text-gray-200 mb-1">
//           Nombre
//         </label>
//         <input
//           id="name"
//           type="text"
//           className="w-full px-4 py-2 bg-gray-700 text-white rounded-lg border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
//           {...register("name")}
//         />
//         {errors.name && <p className="text-sm text-red-400 mt-1">{errors.name.message}</p>}
//       </div>

//       <div>
//         <label htmlFor="type" className="block text-sm font-medium text-gray-200 mb-1">
//           Tipo de Perfil
//         </label>
//         <select
//           id="type"
//           className="w-full px-4 py-2 bg-gray-700 text-white rounded-lg border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
//           {...register("type")}
//         >
//           <option value="adult">Adulto</option>
//           <option value="teen">Adolescente</option>
//           <option value="child">Niño</option>
//         </select>
//         {errors.type && <p className="text-sm text-red-400 mt-1">{errors.type.message}</p>}
//       </div>

//       <div>
//         <label htmlFor="avatar" className="block text-sm font-medium text-gray-200 mb-1">
//           URL de Avatar (opcional)
//         </label>
//         <input
//           id="avatar"
//           type="text"
//           className="w-full px-4 py-2 bg-gray-700 text-white rounded-lg border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
//           {...register("avatar")}
//           onChange={handleAvatarChange}
//         />
//         {errors.avatar && <p className="text-sm text-red-400 mt-1">{errors.avatar.message}</p>}
//       </div>

//       <div className="flex justify-center">
//         <div className="w-24 h-24 rounded-full bg-gray-700 flex items-center justify-center overflow-hidden border-2 border-gray-500">
//           {avatarPreview ? (
//             <img
//               src={avatarPreview}
//               alt="Vista previa de avatar"
//               className="w-full h-full object-cover"
//               onError={(e) => {
//                 e.target.onerror = null
//                 e.target.src = ""
//                 setAvatarPreview("")
//               }}
//             />
//           ) : (
//             <span className="text-3xl font-bold text-white">
//               {profile?.name?.charAt(0).toUpperCase() || "?"}
//             </span>
//           )}
//         </div>
//       </div>

//       <button
//         type="submit"
//         className="w-full py-2 px-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition duration-300"
//       >
//         {buttonText}
//       </button>
//     </form>
//   )
// }

// export default ProfileForm


import { useState } from "react"
import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup"
import avatar1 from '../assets/avatars/profile1.png'
import avatar2 from '../assets/avatars/profile2.png'
import avatar3 from '../assets/avatars/profile3.png'
// Puedes agregar más avatares aquí
// import avatar4 from '../assets/avatars/profile4.png'
// import avatar5 from '../assets/avatars/profile5.png'

const profileSchema = yup
  .object({
    name: yup.string().required("El nombre es obligatorio").max(30, "El nombre debe tener máximo 30 caracteres"),
    type: yup
      .string()
      .required("El tipo de perfil es obligatorio")
      .oneOf(["adult", "teen", "child"], "Tipo de perfil inválido"),
    avatar: yup.string().nullable(),
  })
  .required()

const ProfileForm = ({ profile = null, onSubmit, buttonText = "Guardar" }) => {
  const avatars = [avatar1, avatar2, avatar3] // Puedes agregar más aquí

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(profileSchema),
    defaultValues: {
      name: profile?.name || "",
      type: profile?.type || "adult",
      avatar: profile?.avatar || "",
    },
  })

  const [avatarPreview, setAvatarPreview] = useState(profile?.avatar || "")

  const handleAvatarSelect = (img) => {
    setAvatarPreview(img)
    setValue("avatar", img) // asignar el valor al formulario
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="max-w-md mx-auto p-6 bg-gray-800 rounded-2xl shadow-lg space-y-6"
    >
      <h2 className="text-2xl font-semibold text-white text-center">Crear Perfil</h2>

      <div>
        <label htmlFor="name" className="block text-sm font-medium text-gray-200 mb-1">
          Nombre
        </label>
        <input
          id="name"
          type="text"
          className="w-full px-4 py-2 bg-gray-700 text-white rounded-lg border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          {...register("name")}
        />
        {errors.name && <p className="text-sm text-red-400 mt-1">{errors.name.message}</p>}
      </div>

      <div>
        <label htmlFor="type" className="block text-sm font-medium text-gray-200 mb-1">
          Tipo de Perfil
        </label>
        <select
          id="type"
          className="w-full px-4 py-2 bg-gray-700 text-white rounded-lg border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          {...register("type")}
        >
          <option value="adult">Adulto</option>
          <option value="teen">Adolescente</option>
          <option value="child">Niño</option>
        </select>
        {errors.type && <p className="text-sm text-red-400 mt-1">{errors.type.message}</p>}
      </div>

      <div>
        <p className="block text-sm font-medium text-gray-200 mb-2">Selecciona un Avatar</p>
        <div className="flex flex-wrap gap-4 justify-center">
          {avatars.map((avatar, idx) => (
            <button
              type="button"
              key={idx}
              onClick={() => handleAvatarSelect(avatar)}
              className={`w-16 h-16 rounded-full border-4 ${
                avatar === avatarPreview ? "border-blue-500" : "border-transparent"
              } focus:outline-none overflow-hidden`}
            >
              <img src={avatar} alt={`Avatar ${idx + 1}`} className="w-full h-full object-cover" />
            </button>
          ))}
        </div>
        {errors.avatar && <p className="text-sm text-red-400 mt-1">{errors.avatar.message}</p>}
      </div>

      <div className="flex justify-center mt-4">
        <div className="w-24 h-24 rounded-full bg-gray-700 flex items-center justify-center overflow-hidden border-2 border-gray-500">
          {avatarPreview ? (
            <img
              src={avatarPreview}
              alt="Vista previa de avatar"
              className="w-full h-full object-cover"
              onError={(e) => {
                e.target.onerror = null
                e.target.src = ""
                setAvatarPreview("")
              }}
            />
          ) : (
            <span className="text-3xl font-bold text-white">
              {profile?.name?.charAt(0).toUpperCase() || "?"}
            </span>
          )}
        </div>
      </div>

      <button
        type="submit"
        className="w-full py-2 px-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition duration-300"
      >
        {buttonText}
      </button>
    </form>
  )
}

export default ProfileForm
