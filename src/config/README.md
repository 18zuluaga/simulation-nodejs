# ¿Por qué nos creamos un container.ts?

La libreria `tsyringe` nos permite crear un container de inyección de dependencias, que nos permitirá registrar nuestras dependencias y resolverlas en cualquier parte de nuestra aplicación.

Recordemos que la inyección de dependencias es una técnica que nos permite desacoplar nuestras clases y funciones, permitiéndonos reutilizarlas en cualquier parte de nuestra aplicación y evitando que nuestras clases tengan que instanciar sus dependencias.

Funciona bastante bien con TypeScript, ya que nos permite definir interfaces y tipos para nuestras dependencias, y nos ayuda a mantener un código más limpio y mantenible.

## Paso a paso

1. Instalamos la librería `tsyringe`:

```bash
npm install tsyringe
```

2. Creamos un archivo `container.ts` dentro de la carpeta `src/config`:

```typescript
import { container } from 'tsyringe';

container.register('ExampleService', {
  useClass: ExampleService,
});
```

## Uno a Muchos

En Sequelize, las anotaciones @HasMany y @BelongsTo se utilizan para definir relaciones uno a muchos entre dos modelos. Estas anotaciones ayudan a establecer cómo se relacionan los registros de las tablas entre sí y permiten que Sequelize maneje automáticamente las asociaciones y consultas relacionadas.

@HasMany
La anotación @HasMany se utiliza para definir una relación uno a muchos desde el punto de vista del modelo que "tiene muchos". Es decir, un registro en la tabla de origen puede estar relacionado con varios registros en la tabla de destino.

Ejemplo
Imaginemos que tenemos dos modelos: Author y Book. Un autor puede tener muchos libros, por lo que definimos la relación con @HasMany en el modelo Author.

typescript
Copiar código
// src/models/Author.ts
import {
    Table,
    Column,
    Model,
    DataType,
    HasMany
} from 'sequelize-typescript';
import { Book } from './Book';

@Table({
    tableName: 'authors',
    timestamps: true,
})
export class Author extends Model<Author> {
    @Column({
        type: DataType.STRING(100),
        allowNull: false,
    })
    name!: string;

    @HasMany(() => Book)
    books!: Book[];
}
@BelongsTo
La anotación @BelongsTo se utiliza para definir la parte "muchos" de una relación uno a muchos. Es decir, un registro en la tabla de destino pertenece a un registro en la tabla de origen.

Ejemplo
En el mismo contexto de Author y Book, cada libro pertenece a un autor, por lo que definimos la relación con @BelongsTo en el modelo Book.

typescript
Copiar código
// src/models/Book.ts
import {
    Table,
    Column,
    Model,
    DataType,
    ForeignKey,
    BelongsTo
} from 'sequelize-typescript';
import { Author } from './Author';

@Table({
    tableName: 'books',
    timestamps: true,
})
export class Book extends Model<Book> {
    @Column({
        type: DataType.STRING(100),
        allowNull: false,
    })
    title!: string;

    @ForeignKey(() => Author)
    @Column({
        type: DataType.INTEGER,
        allowNull: false,
    })
    authorId!: number;

    @BelongsTo(() => Author)
    author!: Author;
}
Explicación Detallada
@HasMany(() => Book) en Author:

Define que un autor puede tener muchos libros.
La relación es establecida desde el modelo Author hacia el modelo Book.
@BelongsTo(() => Author) en Book:

Define que un libro pertenece a un autor.
Incluye una clave foránea authorId en el modelo Book, que hace referencia al Author.
Clave Foránea:

En la base de datos, la clave foránea authorId en la tabla books es lo que conecta los libros con su autor correspondiente.
Uso en Consultas
Estas asociaciones permiten realizar consultas relacionadas fácilmente. Por ejemplo, para obtener todos los libros de un autor:

typescript
Copiar código
const author = await Author.findByPk(1, {
    include: [Book],
});
console.log(author.books);
Y para obtener el autor de un libro:

typescript
Copiar código
const book = await Book.findByPk(1, {
    include: [Author],
});
console.log(book.author);
Estas consultas permiten cargar los datos relacionados automáticamente, lo que simplifica mucho la gestión de las relaciones en la base de datos.


## MUCHOS A MUCHOS

En Sequelize, las anotaciones @HasMany y @BelongsTo se utilizan para definir relaciones uno a muchos entre dos modelos. Estas anotaciones ayudan a establecer cómo se relacionan los registros de las tablas entre sí y permiten que Sequelize maneje automáticamente las asociaciones y consultas relacionadas.

@HasMany
La anotación @HasMany se utiliza para definir una relación uno a muchos desde el punto de vista del modelo que "tiene muchos". Es decir, un registro en la tabla de origen puede estar relacionado con varios registros en la tabla de destino.

Ejemplo
Imaginemos que tenemos dos modelos: Author y Book. Un autor puede tener muchos libros, por lo que definimos la relación con @HasMany en el modelo Author.

typescript
Copiar código
// src/models/Author.ts
import {
    Table,
    Column,
    Model,
    DataType,
    HasMany
} from 'sequelize-typescript';
import { Book } from './Book';

@Table({
    tableName: 'authors',
    timestamps: true,
})
export class Author extends Model<Author> {
    @Column({
        type: DataType.STRING(100),
        allowNull: false,
    })
    name!: string;

    @HasMany(() => Book)
    books!: Book[];
}
@BelongsTo
La anotación @BelongsTo se utiliza para definir la parte "muchos" de una relación uno a muchos. Es decir, un registro en la tabla de destino pertenece a un registro en la tabla de origen.

Ejemplo
En el mismo contexto de Author y Book, cada libro pertenece a un autor, por lo que definimos la relación con @BelongsTo en el modelo Book.

typescript
Copiar código
// src/models/Book.ts
import {
    Table,
    Column,
    Model,
    DataType,
    ForeignKey,
    BelongsTo
} from 'sequelize-typescript';
import { Author } from './Author';

@Table({
    tableName: 'books',
    timestamps: true,
})
export class Book extends Model<Book> {
    @Column({
        type: DataType.STRING(100),
        allowNull: false,
    })
    title!: string;

    @ForeignKey(() => Author)
    @Column({
        type: DataType.INTEGER,
        allowNull: false,
    })
    authorId!: number;

    @BelongsTo(() => Author)
    author!: Author;
}
Explicación Detallada
@HasMany(() => Book) en Author:

Define que un autor puede tener muchos libros.
La relación es establecida desde el modelo Author hacia el modelo Book.
@BelongsTo(() => Author) en Book:

Define que un libro pertenece a un autor.
Incluye una clave foránea authorId en el modelo Book, que hace referencia al Author.
Clave Foránea:

En la base de datos, la clave foránea authorId en la tabla books es lo que conecta los libros con su autor correspondiente.
Uso en Consultas
Estas asociaciones permiten realizar consultas relacionadas fácilmente. Por ejemplo, para obtener todos los libros de un autor:

typescript
Copiar código
const author = await Author.findByPk(1, {
    include: [Book],
});
console.log(author.books);
Y para obtener el autor de un libro:

typescript
Copiar código
const book = await Book.findByPk(1, {
    include: [Author],
});
console.log(book.author);
Estas consultas permiten cargar los datos relacionados automáticamente, lo que simplifica mucho la gestión de las relaciones en la base de datos.





y siguiendo esta logica una relacion de muchos  a muchos
ChatGPT
Siguiendo la lógica de las relaciones uno a muchos con @HasMany y @BelongsTo, para una relación muchos a muchos utilizamos @BelongsToMany en ambos lados de la relación. Además, necesitamos una tabla de unión (o tabla intermedia) para almacenar las asociaciones entre los dos modelos. Esta tabla de unión contiene las claves foráneas de ambos modelos, lo que permite establecer la relación muchos a muchos.

Ejemplo de Relación Muchos a Muchos
Consideremos los modelos Student y Course. Un estudiante puede estar inscrito en muchos cursos, y un curso puede tener muchos estudiantes. Para representar esta relación, necesitamos:

Un modelo Student.
Un modelo Course.
Un modelo StudentCourse como tabla de unión para almacenar las asociaciones.
Modelo Student
typescript
Copiar código
// src/models/Student.ts
import {
    Table,
    Column,
    Model,
    DataType,
    BelongsToMany
} from 'sequelize-typescript';
import { Course } from './Course';
import { StudentCourse } from './StudentCourse';

@Table({
    tableName: 'students',
    timestamps: true,
})
export class Student extends Model<Student> {
    @Column({
        type: DataType.STRING(100),
        allowNull: false,
    })
    name!: string;

    @BelongsToMany(() => Course, () => StudentCourse)
    courses!: Course[];
}
Modelo Course
typescript
Copiar código
// src/models/Course.ts
import {
    Table,
    Column,
    Model,
    DataType,
    BelongsToMany
} from 'sequelize-typescript';
import { Student } from './Student';
import { StudentCourse } from './StudentCourse';

@Table({
    tableName: 'courses',
    timestamps: true,
})
export class Course extends Model<Course> {
    @Column({
        type: DataType.STRING(100),
        allowNull: false,
    })
    title!: string;

    @BelongsToMany(() => Student, () => StudentCourse)
    students!: Student[];
}
Tabla de Unión StudentCourse
La tabla de unión StudentCourse almacenará las asociaciones entre Student y Course.

typescript
Copiar código
// src/models/StudentCourse.ts
import {
    Table,
    Column,
    Model,
    ForeignKey,
    DataType
} from 'sequelize-typescript';
import { Student } from './Student';
import { Course } from './Course';

@Table({
    tableName: 'student_courses',
    timestamps: false,
})
export class StudentCourse extends Model<StudentCourse> {
    @ForeignKey(() => Student)
    @Column({
        type: DataType.INTEGER,
        allowNull: false,
    })
    studentId!: number;

    @ForeignKey(() => Course)
    @Column({
        type: DataType.INTEGER,
        allowNull: false,
    })
    courseId!: number;
}
Explicación Detallada
@BelongsToMany(() => Course, () => StudentCourse) en Student:

Define que un estudiante puede estar en muchos cursos.
La relación es establecida desde el modelo Student hacia el modelo Course a través de la tabla de unión StudentCourse.
@BelongsToMany(() => Student, () => StudentCourse) en Course:

Define que un curso puede tener muchos estudiantes.
Similarmente, la relación se establece desde Course hacia Student a través de StudentCourse.
Tabla de Unión (StudentCourse):

Esta tabla contiene las claves foráneas studentId y courseId, que referencian los modelos Student y Course, respectivamente. Esta estructura permite crear una relación muchos a muchos.
Ejemplo de Uso
Para asociar un estudiante con un curso, puedes hacerlo de la siguiente manera:

typescript
Copiar código
// Crear un nuevo estudiante y un nuevo curso
const student = await Student.create({ name: 'Jane Doe' });
const course = await Course.create({ title: 'History 101' });

// Asociar el estudiante con el curso
await student.$add('course', course);

// O, alternativamente, asociar el curso con el estudiante
await course.$add('student', student);
Para obtener todos los cursos de un estudiante:

typescript
Copiar código
const student = await Student.findByPk(1, {
    include: [Course],
});
console.log(student.courses);
Y para obtener todos los estudiantes de un curso:

typescript
Copiar código
const course = await Course.findByPk(1, {
    include: [Student],
});
console.log(course.students);
Estas consultas permiten cargar los datos relacionados automáticamente y manejan las relaciones muchos a muchos de manera eficiente.


## UNO A UNO

En Sequelize, una relación uno a uno se define utilizando las anotaciones @HasOne y @BelongsTo. Estas anotaciones se usan para establecer la relación entre dos modelos donde un registro de una tabla está relacionado con un único registro de otra tabla y viceversa.

Ejemplo de Relación Uno a Uno
Consideremos los modelos User y Profile. Un usuario tiene un perfil y cada perfil pertenece a un solo usuario.

Modelo User
typescript
Copiar código
// src/models/User.ts
import {
    Table,
    Column,
    Model,
    DataType,
    HasOne
} from 'sequelize-typescript';
import { Profile } from './Profile';

@Table({
    tableName: 'users',
    timestamps: true,
})
export class User extends Model<User> {
    @Column({
        type: DataType.STRING(100),
        allowNull: false,
    })
    username!: string;

    @HasOne(() => Profile)
    profile!: Profile;
}
Modelo Profile
typescript
Copiar código
// src/models/Profile.ts
import {
    Table,
    Column,
    Model,
    DataType,
    ForeignKey,
    BelongsTo
} from 'sequelize-typescript';
import { User } from './User';

@Table({
    tableName: 'profiles',
    timestamps: true,
})
export class Profile extends Model<Profile> {
    @Column({
        type: DataType.STRING(100),
        allowNull: false,
    })
    bio!: string;

    @ForeignKey(() => User)
    @Column({
        type: DataType.INTEGER,
        allowNull: false,
    })
    userId!: number;

    @BelongsTo(() => User)
    user!: User;
}
Explicación Detallada
@HasOne(() => Profile) en User:

Indica que un usuario tiene un perfil.
Esta anotación establece la relación desde el modelo User hacia el modelo Profile.
Sequelize crea automáticamente una clave foránea userId en el modelo Profile para gestionar la relación.
@BelongsTo(() => User) en Profile:

Indica que un perfil pertenece a un usuario.
Esta anotación indica que el perfil está relacionado con un único registro en la tabla de User.
La clave foránea userId en Profile se utiliza para enlazar el perfil con el usuario correspondiente.
Ejemplo de Uso
Para crear un usuario con un perfil asociado:

typescript
Copiar código
// Crear un nuevo usuario
const user = await User.create({ username: 'johndoe' });

// Crear un perfil para el usuario
const profile = await Profile.create({ bio: 'Hello, I am John!', userId: user.id });

// O, alternativamente, puedes usar la relación para crear el perfil
const profile = await user.$create('profile', { bio: 'Hello, I am John!' });
Para obtener el perfil de un usuario:

typescript
Copiar código
const user = await User.findByPk(1, {
    include: [Profile],
});
console.log(user.profile);
Y para obtener el usuario de un perfil:

typescript
Copiar código
const profile = await Profile.findByPk(1, {
    include: [User],
});
console.log(profile.user);
Notas
Relación de clave foránea: La clave foránea userId en la tabla profiles es lo que establece la relación uno a uno. Es importante que esta clave sea única para mantener la integridad de la relación uno a uno.
Restricciones y Validaciones: Puedes agregar restricciones adicionales, como unique: true en la columna userId de la tabla profiles para asegurar que cada perfil esté asociado a un solo usuario.
Este patrón permite gestionar relaciones uno a uno de manera eficiente, garantizando que cada entidad tenga una y solo una contraparte relacionada.