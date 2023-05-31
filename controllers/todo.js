const TodoModel = require("../Models/TodoModel");

const test = (req, res) => {
  res.status(200).json({
    status: "success",
    message: "Ruta de prueba en el controlador de todos",
  });
};

// Crear nuevo todo
const create = async (req, res) => {
  try {
    // Recoger parámetros por POST a guardar
    let params = req.body;

    // Validar datos
    if (!params.name || !params.priority) {
      res.status(500).json({
        status: "error",
        message: "Faltan datos por enviar !!!",
      });
    }

    // Crear el objeto a guardar y // Asignar valores al objeto basado en el modelo
    const todo = new TodoModel(params);

    // Guardar artículo en la BD
    await todo.save();

    // Devolver resultado si todo sale bien
    res.status(200).json({
      status: "success",
      message: "Se ha creado un nuevo todo",
      newTodo: todo,
    });
  } catch (error) {
    console.error(error);
  }
};

// Listar todos los todo
const list = async (req, res) => {
  try {
    // Sacar todos de la BD
    const todos = await TodoModel.find({});

    // Mostrar mensaje sino se encuentran todos
    if (todos.length == 0) {
      return res.status(404).json({
        status: "error",
        message: "No se encontraron todos en la BD",
      });
    }

    // Devolver resultado si todo sale bien
    return res.status(200).json({
      status: "success",
      message: "Lista de todos",
      findedTodos: todos,
    });
  } catch (error) {
    console.error(error);
  }
};

const deleteTodo = async (req, res) => {
  try {
    // Obtener el id del todo a eliminar
    let todoId = req.params.id;

    // Eliminar todo de la BD
    const todoToDelete = await TodoModel.findByIdAndDelete(todoId);
    if (!todoToDelete) {
      return res.status(500).json({
        status: "error",
        message: "No se ha podido eliminar",
      });
    }

    // Devolver resultado si todo sale bien
    return res.status(200).json({
      status: "success",
      message: "Todo eliminado",
      deletedTodo: todoToDelete,
    });
  } catch (error) {
    console.error(error);
  }
};

const update = async (req, res) => {
  try {
    // Obtener id del todo a actualizar
    let todoId = req.params.id;

    // Recoger los valores a actualizar desde el body
    let params = req.body;

    // Validar que no se deje alguno de los campos vacío
    if (params.name == "" || params.priority == "" || params.status == "") {
      return res.status(500).json({
        status: "error",
        message: "No se pueden dejar campos en blanco",
      });
    }

    // Hacer una consulta a la BD para buscar el todo y actualizar los datos
    const todoToUpdate = await TodoModel.findByIdAndUpdate(todoId, params, {
      returnDocument: "after",
    });
    if (!todoToUpdate) {
      return res.status(500).json({
        status: "error",
        message: "No se ha podido actualizar",
      });
    }

    // Devolver resultado si todo sale bien
    return res.status(200).json({
      status: "success",
      message: "Todo actualizado con éxito !!!",
      todoUpdated: todoToUpdate,
    });

    // Devolver mensaje de error si no se encuentra el todo en la BD
  } catch (error) {
    console.error(error);
  }
};

// Mostrar la cantidad de todo
const todoCount = async(req, res) => {

  // Contar cantidad total de todos en la BD
  const total = await TodoModel.countDocuments();
  if (total == 0) {
    return res.status(404).json({
      status: "error",
      message: "No hay todos en la BD"
    })
  }

  const completed = await TodoModel.countDocuments({status: "completado"})

  // Devolver respuesta
  return res.status(200).json({
    status: "success",
    message: "Cantidad de todos encontrados",
    total,
    completed,
    pending: total - completed
  })
}

module.exports = {
  test,
  create,
  list,
  deleteTodo,
  update,
  todoCount
};
