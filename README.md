# 📌 Arquitectura Hexagonal en TypeScript

## 🔍 Introducción
La arquitectura hexagonal (tambi\u00e9n conocida como **Ports & Adapters**) es un patrón de diseño que desacopla la lógica de negocio de los detalles de infraestructura, facilitando la mantenibilidad, testeo y escalabilidad del código.

## 🎯 Objetivo
Este repositorio implementa una arquitectura hexagonal en TypeScript utilizando React, React Query y Vite, aplicando buenas prácticas como **tipado fuerte con Zod**, **gestión de estado con hooks**, y **capa de infraestructura desacoplada**.

---

## 🛠️ Estructura del Proyecto

```plaintext
📂 src/
 ├── 📂 domain/            # 📌 Modelos, validaciones y lógica de negocio
 │   ├── post.ts          # Definición de Post y Comment con Zod
 │   └── IPostRepository.ts # Interfaz del repositorio de Posts
 │
 ├── 📂 application/       # 🚀 Casos de uso (orquestación de reglas de negocio)
 │   └── PostUseCases.ts  # Llamadas a la capa de dominio y lógica de negocio
 │
 ├── 📂 infrastructure/    # ⚙️ Adaptadores de salida (APIs, BD, etc.)
 │   ├── api/             # Implementaciones de los repositorios
 │   │   ├── PostRepository.ts
 │   │   └── ApiService.ts # Servicio genérico para peticiones HTTP
 │
 ├── 📂 presentation/      # 🎨 Adaptadores de entrada (UI, Hooks, React Query)
 │   ├── hooks/           # Hooks que conectan con los casos de uso
 │   │   ├── usePosts.ts  # Hook con React Query para gestionar Posts
 │   │   └── useComments.ts
```

---

## 📚 Explicación de la Arquitectura

### 📌 Capas y Responsabilidades

| **Capa**              | **Responsabilidad** |
|----------------------|-----------------------|
| **Dominio**         | Modelos y reglas de negocio puras (sin dependencias externas). |
| **Aplicación**      | Casos de uso (orquestación de lógica de negocio y flujos de datos). |
| **Infraestructura**  | Adaptadores de salida (API, BD, almacenamiento). |
| **Presentación**    | Adaptadores de entrada (UI, React Query, Hooks). |

---

## Implementación en Código

### 📌 **Dominio (Reglas de Negocio)**
```ts
import { z } from "zod";

export const PostSchema = z.object({
  id: z.number().int().positive(),
  userId: z.number().int().positive("Falta usuario creador"),
  title: z.string().min(1, "El título no puede estar vacío"),
  body: z.string().min(1, "El contenido no puede estar vacío"),
});

export type Post = z.infer<typeof PostSchema>;
```

---

### 🚀 **Casos de Uso (Application Layer)**
```ts
import { IPostRepository } from "../domain/IPostRepository";

export const PostUseCases = (repository: IPostRepository) => ({
  getAllPosts: async () => repository.getAll(),
  createNewPost: async (data: Partial<Post>) => repository.create(data),
});
```

---

### ⚙️ **Infraestructura (Adaptadores de Salida - API REST)**
```ts
import { Post } from "../../domain/post";
import { ApiService } from "../config/ApiService";

const postService = new ApiService("/posts", "BASE");

export const PostRepository: IPostRepository = {
  getAll: () => postService.findAll<Post[]>(),
  create: (data) => postService.create<Post>(data),
};
```

---

### 🎨 **Presentación (Adaptadores de Entrada - React Query & Hooks)**
```ts
import { useQuery } from "@tanstack/react-query";
import { PostUseCases } from "../../application/PostUseCases";
import { PostRepository } from "../../infrastructure/api/PostRepository";

const postUseCases = PostUseCases(PostRepository);

export const usePosts = () => {
  return useQuery(["posts"], () => postUseCases.getAllPosts());
};
```

---

## 🚀 **Conclusión**
La **arquitectura hexagonal** mejora la calidad del código al **separar la lógica de negocio de los detalles de implementación**.  
Adoptar esta arquitectura **hará que el código sea más mantenible, fácil de testear y escalable**. 🚀

¡Guia general de Arquitectura Hexagonal con React por @Sagillaire! ✨

