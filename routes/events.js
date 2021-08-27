/*
Event Routes
host + /api/events
*/
const { Router } = require('express');
const { validarJWT } = require('../middlewares/validar-jwt');
const { check } = require('express-validator');


const router = Router();

const { getEventos, crearEvento, actualizarEvento, eliminarEvento } = require("../controllers/events");
const { validarCampos } = require('../middlewares/validar-campos');
const { isDate } = require('../helpers/isDate');

router.use(validarJWT);

// todas tienen que pasar por la validacion del JWT
// Obtener eventos
router.get('/', getEventos);

//crear un nuevo evento
router.post(
    '/', 
    [
        check('title','El titulo es obligatorio').not().isEmpty(),
        check('start','Fecha de Inicio es obligatoria').custom(isDate),
        check('end','Fecha de finalizacion es obligatoria').custom(isDate),
        validarCampos
    ],
    crearEvento
);

//Actualizar evento
router.put(
    '/:id', 
    [
        check('title','El titulo es obligatorio').not().isEmpty(),
        check('start','Fecha de Inicio es obligatoria').custom(isDate),
        check('end','Fecha de finalizacion es obligatoria').custom(isDate),
        validarCampos
    ],
    actualizarEvento
);

//borrar evento
router.delete(
    '/:id', 
eliminarEvento);

module.exports = router;