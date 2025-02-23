//Cada valor solo puede aparecer una vez en una única silla (x.e. solo una persona se puede llamar Naira)
function validarPista0()
{
    let resultado = null;

    const valor = [];

    for(let i = 0; i<6; i++)
    {
        if(sillas[i].nombre)
        {
            if(valor.includes(sillas[i].nombre))
            {
                resultado = false;
            }
            else
            {
                valor.push(sillas[i].nombre);
            }
        }

        if(sillas[i].especialidad)
            {
                if(valor.includes(sillas[i].especialidad))
                {
                    resultado = false;
                }
                else
                {
                    valor.push(sillas[i].especialidad);
                }
            }
        
        if(sillas[i].edad)
        {
            if(valor.includes(sillas[i].edad))
            {
                resultado = false;
            }
            else
            {
                valor.push(sillas[i].edad);
            }
        }

        if(sillas[i].bata)
        {
                if(valor.includes(sillas[i].bata))
                {
                    resultado = false;
                }
                else
                {
                    valor.push(sillas[i].bata);
                }
        }

        if(sillas[i].enfermedad)
        {
                if(valor.includes(sillas[i].enfermedad))
                {
                    resultado = false;
                }
                else
                {
                    valor.push(sillas[i].enfermedad);
                }
        }

        if(sillas[i].guardias)
        {
                if(valor.includes(sillas[i].guardias))
                {
                    resultado = false;
                }
                else
                {
                    valor.push(sillas[i].guardias);
                }
        }

        if(sillas[i].salario)
        {
                if(valor.includes(sillas[i].salario))
                {
                    resultado = false;
                }
                else
                {
                    valor.push(sillas[i].salario);
                }
        }

        if(sillas[i].hospital)
        {
                if(valor.includes(sillas[i].hospital))
                {
                    resultado = false;
                }
                else
                {
                    valor.push(sillas[i].hospital);
                }
        }
    }

    if(valor.length === 48)
    {
        resultado = true;
    }

    return resultado;
}

//Teresa se sienta en la tercera silla y no es cardióloga 
function validarPista1()
{
    let resultado = null;

    let s3 = sillas[2];

    if(isTeresa() >= 0 && s3.nombre && s3.especialidad)
    {
        if(s3.nombre === "Teresa" && isTeresa() === 2 && s3.especialidad !== "Cardiólogo")
        {
            resultado = true;
        }
        else{
            resultado = false;
        }
    }
    else{
        if(isTeresa() >= 0 && isCardiologo() >= 0)
        {
            if(isTeresa() === isCardiologo() || isTeresa() !== 2 || isCardiologo() ===2)
            {
                resultado = false;
            }
        }
        else
        {
            if(s3.especialidad)
            {
                if(s3.especialidad === "Cardiólogo")
                {
                    resultado = false;
                }
            }
            else{
                if(s3.nombre)
                {
                    if(s3.nombre !== "Teresa")
                    {
                        resultado = false;
                    }
                }
                else
                {
                    if(isTeresa() >= 0)
                    {
                        if(isTeresa() !== 2)
                        {
                            resultado = false;
                        }
                    }
                    else
                    {
                        if(isCardiologo() === 2)
                        {
                            resultado = false;
                        }
                    }
                }
            }
        }
    }

    return resultado;
}

//Los médicos sentados contiguamente se llevan como máximo 25 años y como mínimo 5
function validarPista2()
{
    let resultado = null;
    let cont = 0; //comparaciones entre sillas conitguas que cumplen la condición

    for(let i = 0; i<5; i++)
    {
        const s1 = sillas[i];
        const s2 = sillas[i + 1];

        if(s1.edad && s2.edad)
        {
            if(Math.abs(s1.edad - s2.edad) <= 25 && Math.abs(s1.edad - s2.edad) >= 5)
            {
                cont++;
            }
            else
            {
                resultado = false;
            }
        }
    }

    if(cont === 5)
    {
        resultado = true;
    }

    return resultado;
}

//Pepe se sienta inmediatamente a la izquierda del médico que lleva la bata gris
function validarPista3()
{
    let resultado = null;

    if(isPepe() >= 0 && isGris() >= 0)
    {
        if(isGris() - isPepe() === 1)
        {
            resultado = true;
        }
        else
        {
            resultado = false;
        }
    }
    else
    {
        if(isPepe() >= 0)
        {
            if(isPepe() < 5)
            {
                if(sillas[isPepe() + 1].bata)
                {
                    if(sillas[isPepe() + 1].bata !== "Gris")
                    {
                        resultado = false;
                    }
                }
            }
            else
            {
                resultado = false;
            }
        }
        else
        {
            if(isGris() >= 0)
            {
                if(isGris() > 0)
                {
                    if(sillas[isGris() - 1].nombre)
                    {
                        if(sillas[isGris() - 1].nombre !== "Pepe")
                        {
                            resultado = false;
                        }
                    }
                }
                else
                {
                    resultado = false;
                }
            }
        }
    }

    return resultado;
}

//El médico que se sienta en la cuarta silla no trata la próstata y hace menos 
//guardias que el médico que trata el desarrollo del crecimiento, pero más que 
//Jesús 
function validarPista4()
{
    let resultado = null;

    let crec = isCrecimiento();
    let jesus = isJesus();

    if(sillas[3].enfermedad === "Próstata" || sillas[3].nombre === "Jesús" || sillas[3].enfermedad === "Crecimiento")
    {
        resultado = false;
    }
    else
    {
        if(crec >= 0 && jesus >=0)
        {
            if(sillas[crec].guardias && sillas[jesus].guardias && sillas[3].guardias)
            {
                if(sillas[3].guardias < sillas[crec].guardias && sillas[3].guardias > sillas[jesus].guardias)
                {
                    if(sillas[3].enfermedad)
                    {
                        if(sillas[3].enfermedad !== "Próstata")
                        {
                            resultado = true;
                        }
                    }
                }
                else
                {
                    resultado = false;
                }
            }
            else
            {
                if(sillas[crec].guardias)
                    {
                        if(sillas[jesus].guardias)
                        {
                            //x y
                            if(sillas[crec].guardias - sillas[jesus].guardias < 2)
                            {
                                resultado = false;
                            }

                        }
                        else
                        {
                            if(sillas[3].guardias)
                            {
                                //x z
                                if(sillas[3].guardias > 1)
                                {
                                    if(sillas[crec].guardias <= sillas[3].guardias)
                                    {
                                        resultado = false;
                                    }
                                }
                                else
                                {
                                    resultado = false;
                                }
                            }
                            else
                            {
                                //x
                                if(sillas[crec].guardias < 3)
                                {
                                    resultado = false;
                                }
                            }
                        }
                    }
                    else
                    {
                        if(sillas[jesus].guardias)
                        {
                            if(sillas[3].guardias)
                            {
                                //y z
                                if(sillas[3].guardias < 7)
                                {
                                    if(sillas[3].guardias <= sillas[jesus].guardias)
                                    {
                                        resultado = false;
                                    }
                                }
                                else
                                {
                                    resultado = false;
                                }
                            }
                            else
                            {
                                //y
                                if(sillas[jesus].guardias > 4)
                                {
                                    resultado = false;
                                }
                            }
                        }
                        else
                        {
                            if(sillas[3].guardias)
                            {
                                //z
                                if(sillas[3].guardias === 1 || sillas[3].guardias === 7)
                                {
                                    resultado = false;
                                }
                            }
                        }
                    }
            }
        }
        else
        {
            if(crec>=0)
            {
                if(sillas[3].guardias && sillas[crec].guardias)
                {
                    if(sillas[3].guardias > 1)
                        {
                            if(sillas[crec].guardias <= sillas[3].guardias)
                            {
                                resultado = false;
                            }
                        }
                        else
                        {
                            resultado = false;
                        }
                }
                else
                {
                    if(sillas[3].guardias)
                    {
                        //z
                        if(sillas[3].guardias === 1 || sillas[3].guardias === 7)
                            {
                                resultado = false;
                            }
                    }
                    else
                    {
                        if(sillas[crec].guardias)
                        {
                            //x
                            if(sillas[crec].guardias < 3)
                                {
                                    resultado = false;
                                }
                        }
                    }
                }
            }
            else
            {
                if(jesus>=0)
                {
                    if(sillas[jesus].guardias && sillas[3].guardias)
                    {
                        //y z
                        if(sillas[3].guardias < 7)
                            {
                                if(sillas[3].guardias <= sillas[jesus].guardias)
                                {
                                    resultado = false;
                                }
                            }
                            else
                            {
                                resultado = false;
                            }
                    }
                    else
                    {
                        if(sillas[jesus].guardias)
                        {
                            //y
                            if(sillas[jesus].guardias > 4)
                                {
                                    resultado = false;
                                }
                        }
                        else
                        {
                            if(sillas[3].guardias)
                            {
                                //z
                                if(sillas[3].guardias === 1 || sillas[3].guardias === 7)
                                    {
                                        resultado = false;
                                    }
                            }
                        }
                    }
                }
                else
                {
                    if(sillas[3].guardias)
                    {
                        if(sillas[3].guardias === 1 || sillas[3].guardias === 7)
                        {
                            resultado = false;
                        }
                    }
                }
            }
        }
    }

    return resultado;
}

//El médico de la bata negra se sienta a la derecha del urólogo
function validarPista5()
{
    let resultado = null;

    if(isUrologo() >= 0 && isNegra() >= 0)
    {
        if(isNegra() - isUrologo() === 1)
        {
            resultado = true;
        }
        else
        {
            resultado = false;
        }
    }
    else
    {
        if(isUrologo() >= 0)
        {
            if(isUrologo() < 5)
            {
                if(sillas[isUrologo() + 1].bata)
                {
                    if(sillas[isUrologo() + 1].bata !== "Negra")
                    {
                        resultado = false;
                    }
                }
            }
            else
            {
                resultado = false;
            }
        }
        else
        {
            if(isNegra() >= 0)
            {
                if(isNegra() > 0)
                {
                    if(sillas[isNegra() - 1].especialidad)
                    {
                        if(sillas[isNegra() - 1].especialidad !== "Urólogo")
                        {
                            resultado = false;
                        }
                    }
                }
                else
                {
                    resultado = false;
                }
            }
        }
    }

    return resultado;
}

//Fernando gana 72 mil € y hace 2 guardias más que María
function validarPista6()
{
    let resultado = null;

    let x = isFernando();
    let y = isSalario72();
    let z = isMaria();

    if(x>=0 && y>=0 && z>=0)
    {
        //x y z
        if(x === y && x !== z)
        {
            if(sillas[x].guardias && sillas[z].guardias)
            {
                if(sillas[x].guardias - sillas[z].guardias === 2)
                {
                    resultado = true;
                }
                else
                {
                    resultado = false;
                }
            }
            else
            {
                if(sillas[x].guardias)
                    {
                        if(sillas[x].guardias < 3)
                        {
                            resultado = false;
                        }
                    }
    
                    if(sillas[z].guardias)
                    {
                        if(sillas[z].guardias > 6)
                        {
                            resultado = false;
                        }
                    }
            }
        }
        else
        {
            resultado = false;
        }
    }
    else
    {
        if(x>=0)
        {
            if(y>=0)
            {
                //x y
                if(x !== y)
                {
                    resultado = false;
                }
                if(sillas[y].guardias)
                {
                    if(sillas[y].guardias < 3)
                        {
                            resultado = false;
                        }
                }
            }
            else
            {
                if(z>=0)
                {
                    //x z
                    if(x === z)
                        {
                            resultado = false;
                        }
                        else{
                            if(sillas[x].salario)
                                {
                                    if(sillas[x].salario !== "72 mil €")
                                    {
                                        resultado = false;
                                    }
                                }
                            
                            if(sillas[x].guardias && sillas[z].guardias)
                            {
                                if(sillas[x].guardias - sillas[z].guardias !== 2)
                                {
                                    resultado = false;
                                }
                            }
                            else
                            {
                                if(sillas[x].guardias)
                                {
                                    if(sillas[x].guardias < 3)
                                    {
                                        resultado = false;
                                    }
                                }
                
                                if(sillas[z].guardias)
                                {
                                    if(sillas[z].guardias > 6)
                                    {
                                        resultado = false;
                                    }
                                }
                            }
                        }
                }
                else
                {
                    //x
                    if(sillas[x].salario)
                        {
                            if(sillas[x].salario !== "72 mil €")
                            {
                                resultado = false;
                            }
                        }
    
                        if(sillas[x].guardias)
                        {
                            if(sillas[x].guardias < 3)
                            {
                                resultado = false;
                            }
                        }
                }
            }
        }
        else
        {
            if(y>=0)
            {
                if(z>=0)
                {
                    //y z
                    if(y === z)
                    {
                        resultado = false;
                    }
                    else{
                        if(sillas[y].nombre)
                            {
                                if(sillas[y].nombre !== "Fernando")
                                {
                                    resultado = false;
                                }
                            }
                        
                        if(sillas[y].guardias && sillas[z].guardias)
                        {
                            if(sillas[y].guardias - sillas[z].guardias !== 2)
                            {
                                resultado = false;
                            }
                        }
                        else
                        {
                            if(sillas[y].guardias)
                            {
                                if(sillas[y].guardias < 3)
                                {
                                    resultado = false;
                                }
                            }
            
                            if(sillas[z].guardias)
                            {
                                if(sillas[z].guardias > 6)
                                {
                                    resultado = false;
                                }
                            }
                        }
                    }
                }
                else
                {
                    //y
                    if(sillas[y].nombre)
                    {
                        if(sillas[y].nombre !== "Fernando")
                        {
                            resultado = false;
                        }
                    }

                    if(sillas[y].guardias)
                    {
                        if(sillas[y].guardias < 3)
                        {
                            resultado = false;
                        }
                    }
                }
            }
            else
            {
                if(z>=0)
                {
                    //z
                    if(sillas[z].guardias)
                    {
                        if(sillas[z].guardias > 6)
                        {
                            resultado = false;
                        }
                    }
                }
            }
        }
    }

    return resultado;
}

//El pediatra se sienta en una de las sillas de los extremos y lleva bata gris
function validarPista7()
{
    let resultado = null;

    let x = isPediatra();
    let y = isGris();

    if(sillas[0].bata && sillas[5].bata)
    {
        if(sillas[0].bata !== "Gris" && sillas[5].bata !== "Gris")
        {
            resultado = false;
        }
    }

    if(sillas[0].especialidad && sillas[5].especialidad)
    {
        if(sillas[0].especialidad !== "Pediatra" && sillas[5].especialidad !== "Pediatra")
        {
            resultado = false;
        }
    }

    if(x>= 0 && y >= 0)
    {
        if(x === y)
        {
            if(x === 0 || x === 5)
            {
                resultado = true;
            }
            else
            {
                if(x > 0 && x < 5)
                {
                    resultado = false;
                }
            }
        }
        else
        {
            resultado = false;
        }
    }
    else
    {
        if(x>= 0)
        {
            if(x !== 0 && x !== 5)
            {
                resultado = false;
            }
            else
            {
                if(sillas[x].bata)
                {
                    if(sillas[x].bata !== "Gris")
                    {
                        resultado = false;
                    }
                }
            }
        }
        else
        {
            if(y>=0)
            {
                if(y !== 0 && y !== 5)
                {
                    resultado = false;
                }
                else
                {
                    if(sillas[y].especialidad)
                    {
                        if(sillas[y].especialidad !== "Pediatra")
                        {
                            resultado = false;
                        }
                    }
                }
            }
        }
    }

    return resultado;
}

//María tiene 65 años y se sienta al lado del médico con la bata azul 
function validarPista8()
{
    let resultado = null;

    let x = isMaria();
    let y = isEdad65();
    let z = isAzul();

    if(x >= 0 && y >= 0 && z >= 0)
    {
        if(x === y)
        {
            if(Math.abs(x - z) === 1)
            {
                resultado = true;
            }
            else
            {
                resultado = false;
            }
        }
        else
        {
            resultado = false;
        }
    }
    else
    {
        if(x>=0)
        {
            if(y>=0)
            {
                //x y
                if(x === y)
                {
                    if(x !== 0 && x !==5)
                    {
                        if(sillas[x-1].bata && sillas[x+1].bata)
                        {
                            if(sillas[x-1].bata !== "Azul" && sillas[x+1].bata !== "Azul")
                            {
                                resultado = false;
                            }
                        }
                    }
                    else
                    {
                        if(x === 0)
                        {
                            if(sillas[x+1].bata)
                            {
                                if(sillas[x+1].bata !== "Azul")
                                {
                                    resultado = false;
                                }
                            }
                        }
                        else
                        {
                            if(x === 5)
                            {
                                if(sillas[x-1].bata)
                                {
                                    if(sillas[x-1].bata !== "Azul")
                                    {
                                        resultado = false;
                                    }
                                }
                            }
                        }
                    }
                }
                else
                {
                    resultado = false;
                }
            }
            else
            {
                if(z>=0)
                {
                    //x z
                    if(Math.abs(x - z) !== 1)
                    {
                        resultado = false;
                    }
                    else
                    {
                        if(sillas[x].edad)
                        {
                            if(sillas[x].edad !== 65)
                            {
                                resultado = false;
                            }
                        }
                    }
                }
                else
                {
                    //x
                    if(sillas[x].edad)
                    {
                        if(sillas[x].edad !== 65)
                        {
                            resultado = false;
                        }
                    }

                    if(x !== 0 && x !== 5)
                    {
                        if(sillas[x-1].bata && sillas[x+1].bata)
                        {
                            if(sillas[x-1].bata !== "Azul" && sillas[x+1].bata !== "Azul")
                            {
                                resultado = false;
                            }
                        }
                    }
                    else
                    {
                        if(x === 0)
                        {
                            if(sillas[x+1].bata)
                                {
                                    if(sillas[x+1].bata !== "Azul")
                                    {
                                        resultado = false;
                                    }
                                }
                        }else
                        {
                            if(x === 5)
                            {
                                if(sillas[x-1].bata)
                                    {
                                        if(sillas[x-1].bata !== "Azul")
                                        {
                                            resultado = false;
                                        }
                                    }
                            }
                        }
                    }
                }
            }
        }
        else
        {
            if(y>=0)
            {
                if(z>=0)
                {
                    //y z
                    if(Math.abs(y-z) !== 1)
                    {
                        resultado = false;
                    }
                    else
                    {
                        if(sillas[y].nombre)
                        {
                            if(sillas[y].nombre !== "María")
                            {
                                resultado = false;
                            }
                        }
                    }
                }
                else
                {
                    //y
                    if(sillas[y].nombre)
                        {
                            if(sillas[y].nombre !== "María")
                            {
                                resultado = false;
                            }
                        }
    
                        if(y !== 0 && y !== 5)
                        {
                            if(sillas[y-1].bata && sillas[y+1].bata)
                            {
                                if(sillas[y-1].bata !== "Azul" && sillas[y+1].bata !== "Azul")
                                {
                                    resultado = false;
                                }
                            }
                        }
                        else
                        {
                            if(y === 0)
                            {
                                if(sillas[y+1].bata)
                                    {
                                        if(sillas[y+1].bata !== "Azul")
                                        {
                                            resultado = false;
                                        }
                                    }
                            }else
                            {
                                if(y === 5)
                                {
                                    if(sillas[y-1].bata)
                                        {
                                            if(sillas[y-1].bata !== "Azul")
                                            {
                                                resultado = false;
                                            }
                                        }
                                }
                            }
                        }
                }
            }
            else
            {
                if(z>=0)
                {
                    //z
                    if(z !== 0 && z !== 5)
                    {
                        if(sillas[z-1].nombre && sillas[z+1].nombre)
                        {
                            if(sillas[z-1].nombre !== "María" && sillas[z+1].nombre !== "María")
                            {
                                resultado = false;
                            }
                        }

                        if(sillas[z-1].edad && sillas[z+1].edad)
                        {
                            if(sillas[z-1].edad !== 65 && sillas[z+1].edad !== 65)
                            {
                                resultado = false;
                            }
                        }
                    }
                    else
                    {
                        if(z === 0)
                        {
                            if(sillas[z+1].nombre)
                                {
                                    if(sillas[z+1].nombre !== "María")
                                    {
                                        resultado = false;
                                    }
                                }
        
                                if(sillas[z+1].edad)
                                {
                                    if(sillas[z+1].edad !== 65)
                                    {
                                        resultado = false;
                                    }
                                }
                        }
                        else
                        {
                            if(z === 5)
                            {
                                if(sillas[z-1].nombre)
                                    {
                                        if(sillas[z-1].nombre !== "María")
                                        {
                                            resultado = false;
                                        }
                                    }
            
                                    if(sillas[z-1].edad)
                                    {
                                        if(sillas[z-1].edad !== 65)
                                        {
                                            resultado = false;
                                        }
                                    }
                            }
                        }
                    }
                }
            }
        }
    }

    return resultado;
}

//El médico que hace una guardia semanal trabaja en el Príncipe de Asturias
function validarPista9()
{
    let resultado = null;

    if(isGuardia1() >= 0 && isPrincipe() >= 0)
    {
        if(isGuardia1() === isPrincipe())
        {
            resultado = true;
        }
        else
        {
            resultado = false;
        }
    }
    else
    {
        if(isGuardia1() >= 0)
        {
            if(sillas[isGuardia1()].hospital)
            {
                if(sillas[isGuardia1()].hospital !== "Príncipe de Asturias")
                {
                    resultado = false;
                }
            }
        }
        else
        {
            if(isPrincipe() >= 0)
            {
                if(sillas[isPrincipe()].guardias)
                {
                    if(sillas[isPrincipe()].guardias !== 1)
                    {
                        resultado = false;
                    }
                }
            }
        }
    }
    
    return resultado;
}

// El médico de la bata azul se sienta entre el cardiólogo (a su izquierda 
//inmediatamente) y el médico con salario de 55 mil € (a su derecha 
//inmediatamente) 
function validarPista10()
{
    let resultado = null;

    let x = isCardiologo();
    let y = isAzul();
    let z = isSalario55();

    if(x >= 0 && y>= 0 && z >= 0)
    {
        //x y z
        if(((z - y) === 1) && ((y - x) === 1))
        {
            resultado = true;
        }
        else
        {
            resultado = false;
        }
    }
    else{
        if(x >= 0)
        {
            if(y >= 0)
            {
                // x y
                if(y - x !== 1)
                {
                    resultado = false;
                }
                else
                {
                    if(y === 5)
                    {
                        resultado = false;
                    }
                    else
                    {
                        if(sillas[y+1].salario)
                        {
                            if(sillas[y+1].salario !== "55 mil €")
                            {
                                resultado = false;
                            }
                        }
                    }
                }
            }
            else
            {
                if(z >= 0)
                {
                    //x z
                    if(z - x !== 2)
                    {
                        resultado = false;
                    }
                    else
                    {
                        if(x > 3 || z < 2)
                        {
                            resultado = false;
                        }
                        else
                        {
                            if(sillas[z-1].bata)
                            {
                                if(sillas[z-1].bata !== "Azul")
                                {
                                    resultado = false;
                                }
                            }
                        }
                    }
                }
                else
                {
                    // x
                    if(x > 3)
                    {
                        resultado = false;
                    }
                    else{
                        if(sillas[x+1].bata)
                        {
                            if(sillas[x+1].bata !== "Azul")
                            {
                                resultado = false;
                            }
                        }

                        if(sillas[x+2].salario)
                        {
                            if(sillas[x+2].salario !== "55 mil €")
                            {
                                resultado = false;
                            }
                        }
                    }
                }
            }
        }
        else
        {
            if(y >= 0)
            {
                if(z >= 0)
                {
                    //y z
                    if(z - y !== 1)
                    {
                        resultado = false;
                    }
                    else{
                        if(y < 1)
                        {
                            resultado = false;
                        }
                        else
                        {
                            if(sillas[y-1].especialidad)
                            {
                                if(sillas[y-1].especialidad !== "Cardiólogo")
                                {
                                    resultado = false;
                                }
                            }
                        }
                    }
                }
                else
                {
                    //y
                    if(y < 1 || y > 4)
                    {
                        resultado = false;
                    }
                    else
                    {
                        if(sillas[y-1].especialidad)
                        {
                            if(sillas[y-1].especialidad !== "Cardiólogo")
                            {
                                resultado = false;
                            }
                        }

                        if(sillas[y+1].salario)
                        {
                            if(sillas[y+1].salario !== "55 mil €")
                            {
                                resultado = false;
                            }
                        }
                    }
                }
            }
            else
            {
                if(z >= 0)
                {
                    //z
                    if(z<2)
                    {
                        resultado = false;
                    }
                    else
                    {
                        if(sillas[z-2].especialidad)
                        {
                            if(sillas[z-2].especialidad !== "Cardiólogo")
                            {
                                resultado = false;
                            }
                        }

                        if(sillas[z-1].bata)
                        {
                            if(sillas[z-1].bata !== "Azul")
                            {
                                resultado = false;
                            }
                        }
                    }
                }
            }
        }
    }

    return resultado;
}

//El médico que trabaja en el hospital el Niño Jesús hace 4 guardias 
//semanales
function validarPista11()
{
    let resultado = null;

    if(isGuardia4() >= 0 && isNiñoJesus() >= 0)
    {
        if(isGuardia4() === isNiñoJesus())
        {
            resultado = true;
        }
        else
        {
            resultado = false;
        }
    }
    else
    {
        if(isGuardia4() >= 0)
        {
            if(sillas[isGuardia4()].hospital)
            {
                if(sillas[isGuardia4()].hospital !== "Niño Jesús")
                {
                    resultado = false;
                }
            }
        }
        else
        {
            if(isNiñoJesus() >= 0)
            {
                if(sillas[isNiñoJesus()].guardias)
                {
                    if(sillas[isNiñoJesus()].guardias !== 4)
                    {
                        resultado = false;
                    }
                }
            }
        }
    }
    
    return resultado;
}

// El psiquiatra se sienta entre el médico de bata verde (a su izquierda 
//inmediatamente) y el médico que trabaja en el hospital Gómez Ulla (a su 
//derecha inmediatamente) 
function validarPista12()
{
    let resultado = null;

    let x = isVerde();
    let y = isPsiquiatra();
    let z = isGomezUlla();

    if(x >= 0 && y>= 0 && z >= 0)
    {
        //x y z
        if(((z - y) === 1) && ((y - x) === 1))
        {
            resultado = true;
        }
        else
        {
            resultado = false;
        }
    }
    else{
        if(x >= 0)
        {
            if(y >= 0)
            {
                // x y
                if(y - x !== 1)
                {
                    resultado = false;
                }
                else
                {
                    if(y === 5)
                    {
                        resultado = false;
                    }
                    else
                    {
                        if(sillas[y+1].hospital)
                        {
                            if(sillas[y+1].hospital !== "Gómez Ulla")
                            {
                                resultado = false;
                            }
                        }
                    }
                }
            }
            else
            {
                if(z >= 0)
                {
                    //x z
                    if(z - x !== 2)
                    {
                        resultado = false;
                    }
                    else
                    {
                        if(x > 3 || z < 2)
                        {
                            resultado = false;
                        }
                        else
                        {
                            if(sillas[z-1].especialidad)
                            {
                                if(sillas[z-1].especialidad !== "Psiquiatra")
                                {
                                    resultado = false;
                                }
                            }
                        }
                    }
                }
                else
                {
                    // x
                    if(x > 3)
                    {
                        resultado = false;
                    }
                    else{
                        if(sillas[x+1].especialidad)
                        {
                            if(sillas[x+1].especialidad !== "Psiquiatra")
                            {
                                resultado = false;
                            }
                        }

                        if(sillas[x+2].hospital)
                        {
                            if(sillas[x+2].hospital !== "Gómez Ulla")
                            {
                                resultado = false;
                            }
                        }
                    }
                }
            }
        }
        else
        {
            if(y >= 0)
            {
                if(z >= 0)
                {
                    //y z
                    if(z - y !== 1)
                    {
                        resultado = false;
                    }
                    else{
                        if(y < 1)
                        {
                            resultado = false;
                        }
                        else
                        {
                            if(sillas[y-1].bata)
                            {
                                if(sillas[y-1].bata !== "Verde")
                                {
                                    resultado = false;
                                }
                            }
                        }
                    }
                }
                else
                {
                    //y
                    if(y < 1 || y > 4)
                    {
                        resultado = false;
                    }
                    else
                    {
                        if(sillas[y-1].bata)
                        {
                            if(sillas[y-1].bata !== "Verde")
                            {
                                resultado = false;
                            }
                        }

                        if(sillas[y+1].hospital)
                        {
                            if(sillas[y+1].hospital !== "Gómez Ulla")
                            {
                                resultado = false;
                            }
                        }
                    }
                }
            }
            else
            {
                if(z >= 0)
                {
                    //z
                    if(z<2)
                    {
                        resultado = false;
                    }
                    else
                    {
                        if(sillas[z-2].bata)
                        {
                            if(sillas[z-2].bata !== "Verde")
                            {
                                resultado = false;
                            }
                        }

                        if(sillas[z-1].especialidad)
                        {
                            if(sillas[z-1].especialidad !== "Psiquiatra")
                            {
                                resultado = false;
                            }
                        }
                    }
                }
            }
        }
    }

    return resultado;
}

//Naira trata la arritmia y se sienta inmediatamente a la izquierda de el 
//médico con salario de 70 mil € 
function validarPista13()
{
    let resultado = null;

    if(isLucia() >= 0 && isArritmia() >= 0 && isSalario70() >= 0)
    {
        //x y z
        if(isLucia() === isArritmia() && (isSalario70() - isLucia()) === 1)
        {
            resultado = true;
        }
        else
        {
            resultado = false;
        }
    }
    else
    {
        if(isLucia() >= 0)
        {
            if(isArritmia() >=0)
            {
                //x y
                if(isLucia() !== isArritmia())
                {
                    resultado = false;
                }
                else
                {
                    if(isLucia() !== 5)
                    {
                        if(sillas[isLucia() + 1].salario)
                        {
                            if(sillas[isLucia() + 1].salario !== "70 mil €")
                            {
                                resultado = false;
                            }
                        }
                    }
                    else
                    {
                        resultado = false;
                    }
                }

            }
            else
            {
                if(isSalario70() >= 0)
                {
                    //x z
                    if(isSalario70() - isLucia() !== 1)
                    {
                        resultado = false;
                    }
                    else
                    {
                        if(sillas[isLucia()].enfermedad)
                        {
                            if(sillas[isLucia()].enfermedad !== "Arritmia")
                            {
                                resultado = false;
                            }
                        }
                    }
                }
                else
                {
                    //x
                    if(isLucia() === 5)
                    {
                        resultado = false;
                    }
                    else
                    {
                        if(sillas[isLucia()].enfermedad)
                        {
                            if(sillas[isLucia()].enfermedad !== "Arritmia")
                            {
                                resultado = false;
                            }
                        }

                        if(sillas[isLucia() + 1].salario)
                        {
                            if(sillas[isLucia() + 1].salario !== "70 mil €")
                            {
                                resultado = false;
                            }
                        }
                    }
                }
            }
        }
        else
        {
            if(isArritmia() >= 0)
            {
                if(isSalario70() >= 0)
                {
                    //y z
                    if(isSalario70() - isArritmia() !== 1)
                    {
                        resultado = false;
                    }
                    else
                    {
                        if(sillas[isArritmia()].nombre)
                        {
                            if(sillas[isArritmia()].nombre !== "Naira")
                            {
                                resultado = false;
                            }
                        }
                    }
                }
                else
                {
                    //y
                    if(isArritmia() === 5)
                    {
                        resultado = false;
                    }
                    else
                    {
                        if(sillas[isArritmia()].nombre)
                        {
                            if(sillas[isArritmia()].nombre !== "Naira")
                            {
                                resultado = false;
                            }
                        }

                        if(sillas[isArritmia() + 1].salario)
                        {
                            if(sillas[isArritmia() + 1].salario !== "70 mil €")
                            {
                                resultado = false;
                            }
                        }
                    }
                }
            }
            else{
                if(isSalario70() >= 0)
                {
                    //z
                    if(isSalario70() === 0)
                    {
                        resultado = false;
                    }
                    else
                    {
                        if(sillas[isSalario70() - 1].nombre)
                        {
                            if(sillas[isSalario70() - 1].nombre !== "Naira")
                            {
                                resultado = false;
                            }
                        }

                        if(sillas[isSalario70() - 1].enfermedad)
                        {
                            if(sillas[isSalario70() - 1].enfermedad !== "Arritmia")
                            {
                                resultado = false;
                            }
                        }
                    }
                }
            }
        }
    }

    return resultado;
}

// Quien se sienta en la primera silla trabaja en el hospital Quirón 
function validarPista14()
{
    let resultado = null;

    let s1 = sillas[0];

    if(isQuiron() >= 0 && s1.hospital)
    {
        if(isQuiron() === 0 && s1.hospital === "Quirón")
        {
            resultado = true;
        }
        else
        {
            resultado = false;
        }
    }
    else
    {
        if(isQuiron() >= 0)
        {
            if(isQuiron() !== 0)
            {
                resultado = false;
            }
        }
        else
        {
            if(s1.hospital)
            {
                if(s1.hospital !== "Quirón")
                {
                    resultado = false;
                }
            }
        }
    }

    return resultado;
}

//Teresa lleva bata blanca y tiene 5 años menos que el nefrólogo, que se 
//sienta en una de las sillas de su izquierda 
function validarPista15()
{
    let resultado = null;
    let steresa = null;
    let sblanca = null;
    let snefrologo = null;

    if(isTeresa() >= 0 && isBlanca()>= 0 && isNefrologo() >= 0)
    {
        // a b c
        steresa = sillas[isTeresa()];
        sblanca = sillas[isBlanca()];
        snefrologo = sillas[isNefrologo()];

        if(isTeresa() === isBlanca() && isTeresa() !== isNefrologo())
        {
            if(isTeresa() === 0 || isNefrologo() === 5)
            {
                console.log(`1`);
                resultado = false;
            }
            else
            {
                if(isTeresa() <= isNefrologo())
                {
                    console.log(`2`);
                    resultado = false;
                }
                else
                {
                    if(steresa.edad && snefrologo.edad)
                        {
                            if(steresa.edad === 65 || snefrologo.edad === 35)
                            {
                                console.log(`3`);
                                resultado = false;
                            }
                            else
                            {
                                if(snefrologo.edad - steresa.edad === 5)
                                {
                                    console.log(`4`);
                                    resultado = true;
                                }
                                else
                                {
                                    console.log(`5`);
                                    resultado = false;
                                }
                            }
                        }
                        else
                        {
                            if(steresa.edad)
                            {
                                if(steresa.edad === 65)
                                {
                                    console.log(`6`);
                                    resultado = false;
                                }
                            }
                            else
                            {
                                if(snefrologo.edad)
                                {
                                    if(snefrologo.edad === 35)
                                    {
                                        console.log(`7`);
                                        resultado = false;
                                    }
                                }
                            }
                        }
                }
                
            }
            
        }
    }
    else
    {
        if(isTeresa()>=0 )
        {
            if(isBlanca() >=0)
            {
                //a b
                steresa = sillas[isTeresa()];
                sblanca = sillas[isBlanca()];

                if(isTeresa() !== isBlanca())
                {
                    console.log(`8`);
                    resultado = false;
                }
                else
                {
                    if(isTeresa() === 0)
                    {
                        console.log(`9`);
                        resultado = false;
                    }
                    else
                    {
                        if(steresa.edad)
                        {
                            if(steresa.edad === 65)
                            {
                                console.log(`10`);
                                resultado = false;
                            }
                        }
                    }
                }
            }
            else
            {
                if(isNefrologo() >= 0)
                {
                    //a c
                    steresa = sillas[isTeresa()];
                    snefrologo = sillas[isNefrologo()];

                    if(sillas[isTeresa()].bata)
                        {
                            if(sillas[isTeresa()].bata !== "Blanca")
                            {
                                console.log(`11`);
                                resultado = false;
                            }
                        }

                    if(isTeresa() <= isNefrologo())
                    {
                        console.log(`12: teresa ${steresa}, nefrologo ${snefrologo}`);
                        resultado = false;
                    }
                    else
                    {
                        if(isTeresa() === 0 || isNefrologo() === 5)
                        {
                            console.log(`13`);
                            resultado = false;
                        }
                        else
                        {
                            if(steresa.edad && snefrologo.edad)
                                {
                                    if(steresa.edad === 65 || snefrologo.edad === 35)
                                    {
                                        console.log(`14`);
                                        resultado = false;
                                    }
                                    else
                                    {
                                        if(snefrologo.edad - steresa.edad !== 5)
                                        {
                                            console.log(`15`);
                                            resultado = false;
                                        }
                                    }
                                }
                                else
                                {
                                    if(steresa.edad)
                                    {
                                        if(steresa.edad === 65)
                                        {
                                            console.log(`16`);
                                            resultado = false;
                                        }
                                    }
                                    else
                                    {
                                        if(snefrologo.edad)
                                        {
                                            if(snefrologo.edad === 35)
                                            {
                                                console.log(`17`);
                                                resultado = false;
                                            }
                                        }
                                    }
                                }
                        }
                    }
                }
                else
                {
                    //a
                    if(isTeresa() === 0)
                    {
                        console.log(`18`);
                        resultado = false;
                    }
                    else
                    {
                        if(sillas[isTeresa()].edad)
                        {
                            if(sillas[isTeresa()].edad === 65)
                            {
                                console.log(`19`);
                                resultado = false;
                            }
                        }
                    }

                    if(sillas[isTeresa()].bata)
                    {
                        if(sillas[isTeresa()].bata !== "Blanca")
                        {
                            console.log(`20`);
                            resultado = false;
                        }
                    }
                }
            }
        }
        else
        {
            if(isBlanca() >=0)
            {
                if(isNefrologo() >= 0)
                {
                    //b c
                    steresa = sillas[isBlanca()];
                    snefrologo = sillas[isNefrologo()];

                    if(sillas[isBlanca()].nombre)
                        {
                            if(sillas[isBlanca()].nombre !== "Teresa")
                            {
                                console.log(`21`);
                                resultado = false;
                            }
                        }

                    if(isBlanca() <= isNefrologo())
                    {
                        console.log(`22`);
                        resultado = false;
                    }
                    else
                    {
                        if(isBlanca() === 0 || isNefrologo() === 5)
                        {
                            console.log(`23`);
                            resultado = false;
                        }
                        else
                        {
                            if(steresa.edad && snefrologo.edad)
                                {
                                    if(steresa.edad === 65 || snefrologo.edad === 35)
                                    {
                                        console.log(`24`);
                                        resultado = false;
                                    }
                                    else
                                    {
                                        if(snefrologo.edad - steresa.edad !== 5)
                                        {
                                            console.log(`25`);
                                            resultado = false;
                                        }
                                    }
                                }
                                else
                                {
                                    if(steresa.edad)
                                    {
                                        if(steresa.edad === 65)
                                        {
                                            console.log(`26`);
                                            resultado = false;
                                        }
                                    }
                                    else
                                    {
                                        if(snefrologo.edad)
                                        {
                                            if(snefrologo.edad === 35)
                                            {
                                                console.log(`27`);
                                                resultado = false;
                                            }
                                        }
                                    }
                                }
                        }
                    }
                

                }
                else
                {
                    //b
                    if(isBlanca() === 0)
                    {
                        console.log(`28`);
                        resultado = false;
                    }
                    else
                    {
                        if(sillas[isBlanca()].edad)
                            {
                                if(sillas[isBlanca()].edad === 65)
                                {
                                    console.log(`29`);
                                    resultado = false;
                                }
                            }
                        if(sillas[isBlanca()].nombre)
                        {
                            if(sillas[isBlanca()].nombre !== "Teresa")
                            {
                                if(sillas[isBlanca()].nombre !== "Snefrologo")
                                resultado = false;
                            }
                        }
                    }
                }
            }
            else
            {
                if(isNefrologo() >= 0)
                {
                    //c
                    if(isNefrologo() === 5)
                    {
                        console.log(`30`);
                        resultado = false;
                    }
                    else
                    {
                        if(sillas[isNefrologo()].edad)
                        {
                            if(sillas[isNefrologo()].edad === 35)
                            {
                                console.log(`31`);
                                resultado = false;
                            }
                        }
                    }
                }
            }
        }
    }

    return resultado;
}

//El médico que hace 2 guardias semanales tiene un salario de 15 mil € 
function validarPista16()
{
    let resultado = null;

    if(isGuardia2() >= 0 && isSalario15() >= 0)
    {
        if(isGuardia2() === isSalario15())
        {
            resultado = true;
        }
        else
        {
            resultado = false;
        }
    }
    else
    {
        if(isGuardia2() >= 0)
        {
            if(sillas[isGuardia2()].salario)
            {
                if(sillas[isGuardia2()].salario !== "15 mil €")
                {
                    resultado = false;
                }
            }
        }
        else
        {
            if(isSalario15() >= 0)
            {
                if(sillas[isSalario15()].guardias)
                {
                    if(sillas[isSalario15()].guardias !== 2)
                    {
                        resultado = false;
                    }
                }
            }
        }
    }
    
    return resultado;
}

//El dermatólogo tiene 50 años 
function validarPista17()
{
    let resultado = null;

    if(isDermatologo() >= 0 && isEdad50() >= 0)
    {
        if(isDermatologo() === isEdad50())
        {
            resultado = true;
        }
        else
        {
            resultado = false;
        }
    }
    else
    {
        if(isDermatologo() >= 0)
        {
            if(sillas[isDermatologo()].edad)
            {
                if(sillas[isDermatologo()].edad !== 50)
                {
                    resultado = false;
                }
            }
        }
        else
        {
            if(isEdad50() >= 0)
            {
                if(sillas[isEdad50()].especialidad)
                {
                    if(sillas[isEdad50()].especialidad !== "Dermatólogo")
                    {
                        resultado = false;
                    }
                }
            }
        }
    }
    
    return resultado;
}

//El médico de 60 años se sienta inmediatamente a la derecha del médico 
//con la bata blanca 
function validarPista18()
{
    let resultado = null;

    if(isBlanca() >= 0 && isEdad60() >= 0)
    {
        if(isEdad60() - isBlanca() === 1)
        {
            resultado = true;
        }
        else
        {
            resultado = false;
        }
    }
    else
    {
        if(isBlanca() >= 0)
        {
            if(isBlanca() < 5)
            {
                if(sillas[isBlanca() + 1].edad)
                {
                    if(sillas[isBlanca() + 1].edad !== 60)
                    {
                        resultado = false;
                    }
                }
            }
            else
            {
                resultado = false;
            }
        }
        else
        {
            if(isEdad60() >= 0)
            {
                if(isEdad60() > 0)
                {
                    if(sillas[isEdad60() - 1].bata)
                    {
                        if(sillas[isEdad60() - 1].bata !== "Blanca")
                        {
                            resultado = false;
                        }
                    }
                }
                else
                {
                    resultado = false;
                }
            }
        }
    }

    return resultado;
}

// El médico del Gómez Ulla se sienta entre el médico con bata rosa y el 
//médico con salario de 60 mil € 
function validarPista19()
{
    let resultado = null;

    let x = isRosa();
    let y = isGomezUlla();
    let z = isSalario60();

    if(x >= 0 && y>= 0 && z >= 0)
    {
        //x y z
        if(((z - y) === 1) && ((y - x) === 1))
        {
            resultado = true;
        }
        else
        {
            resultado = false;
        }
    }
    else{
        if(x >= 0)
        {
            if(y >= 0)
            {
                // x y
                if(y - x !== 1)
                {
                    resultado = false;
                }
                else
                {
                    if(y === 5)
                    {
                        resultado = false;
                    }
                    else
                    {
                        if(sillas[y+1].salario)
                        {
                            if(sillas[y+1].salario !== "60 mil €")
                            {
                                resultado = false;
                            }
                        }
                    }
                }
            }
            else
            {
                if(z >= 0)
                {
                    //x z
                    if(z - x !== 2)
                    {
                        resultado = false;
                    }
                    else
                    {
                        if(x > 3 || z < 2)
                        {
                            resultado = false;
                        }
                        else
                        {
                            if(sillas[z-1].hospital)
                            {
                                if(sillas[z-1].hospital !== "Gómez Ulla")
                                {
                                    resultado = false;
                                }
                            }
                        }
                    }
                }
                else
                {
                    // x
                    if(x > 3)
                    {
                        resultado = false;
                    }
                    else{
                        if(sillas[x+1].hospital)
                        {
                            if(sillas[x+1].hospital !== "Gómez Ulla")
                            {
                                resultado = false;
                            }
                        }

                        if(sillas[x+2].salario)
                        {
                            if(sillas[x+2].salario !== "60 mil €")
                            {
                                resultado = false;
                            }
                        }
                    }
                }
            }
        }
        else
        {
            if(y >= 0)
            {
                if(z >= 0)
                {
                    //y z
                    if(z - y !== 1)
                    {
                        resultado = false;
                    }
                    else{
                        if(y < 1)
                        {
                            resultado = false;
                        }
                        else
                        {
                            if(sillas[y-1].bata)
                            {
                                if(sillas[y-1].bata !== "Rosa")
                                {
                                    resultado = false;
                                }
                            }
                        }
                    }
                }
                else
                {
                    //y
                    if(y < 1 || y > 4)
                    {
                        resultado = false;
                    }
                    else
                    {
                        if(sillas[y-1].bata)
                        {
                            if(sillas[y-1].bata !== "Rosa")
                            {
                                resultado = false;
                            }
                        }

                        if(sillas[y+1].salario)
                        {
                            if(sillas[y+1].salario !== "60 mil €")
                            {
                                resultado = false;
                            }
                        }
                    }
                }
            }
            else
            {
                if(z >= 0)
                {
                    //z
                    if(z<2)
                    {
                        resultado = false;
                    }
                    else
                    {
                        if(sillas[z-2].bata)
                        {
                            if(sillas[z-2].bata !== "Rosa")
                            {
                                resultado = false;
                            }
                        }

                        if(sillas[z-1].hospital)
                        {
                            if(sillas[z-1].hospital !== "Gómez Ulla")
                            {
                                resultado = false;
                            }
                        }
                    }
                }
            }
        }
    }

    return resultado;
}

//El médico que trabaja en el 12 de Octubre se sienta inmediatamente a la 
//izquierda del médico que lleva bata blanca 
function validarPista20()
{
    let resultado = null;

    if(is12Octubre() >= 0 && isBlanca() >= 0)
    {
        if(isBlanca() - is12Octubre() === 1)
        {
            resultado = true;
        }
        else
        {
            resultado = false;
        }
    }
    else
    {
        if(is12Octubre() >= 0)
        {
            if(is12Octubre() < 5)
            {
                if(sillas[is12Octubre() + 1].bata)
                {
                    if(sillas[is12Octubre() + 1].bata !== "Blanca")
                    {
                        resultado = false;
                    }
                }
            }
            else
            {
                resultado = false;
            }
        }
        else
        {
            if(isBlanca() >= 0)
            {
                if(isBlanca() > 0)
                {
                    if(sillas[isBlanca() - 1].hospital)
                    {
                        if(sillas[isBlanca() - 1].hospital !== "12 de Octubre")
                        {
                            resultado = false;
                        }
                    }
                }
                else
                {
                    resultado = false;
                }
            }
        }
    }

    return resultado;
}

//Jesús hace 3 guardias y se sienta inmediatamente a la izquierda del médico 
//que trata la paranoia 
function validarPista21()
{
    let resultado = null;

    if(isJesus() >= 0 && isGuardia3() >= 0 && isParanoia() >= 0)
    {
        //x y z
        if(isJesus() === isGuardia3() && ((isParanoia() - isJesus()) === 1))
        {
            resultado = true;
        }
        else
        {
            //console.log(`1`);
            resultado = false;
        }
    }
    else
    {
        if(isJesus() >= 0)
        {
            if(isGuardia3() >=0)
            {
                //x y
                if(isJesus() !== isGuardia3())
                {
                    //console.log(`2`);
                    resultado = false;
                }
                else
                {
                    if(isJesus() !== 5)
                    {
                        if(sillas[isJesus() + 1].enfermedad)
                        {
                            if(sillas[isJesus() + 1].enfermedad !== "Paranoia")
                            {
                                //console.log(`3`);
                                resultado = false;
                            }
                        }
                    }
                    else
                    {
                        //console.log(`4`);
                        resultado = false;
                    }
                }

            }
            else
            {
                if(isParanoia() >= 0)
                {
                    //x z
                    if(isParanoia() - isJesus() !== 1)
                    {
                        //console.log(`5`);
                        resultado = false;
                    }
                    else
                    {
                        if(sillas[isJesus()].guardias)
                        {
                            if(sillas[isJesus()].guardias !== 3)
                            {
                                //console.log(`6`);
                                resultado = false;
                            }
                        }
                    }
                }
                else
                {
                    //x
                    if(isJesus() === 5)
                    {
                        //console.log(`7`);
                        resultado = false;
                    }
                    else
                    {
                        if(sillas[isJesus()].guardias)
                        {
                            if(sillas[isJesus()].guardias !== 3)
                            {
                                //console.log(`8`);
                                resultado = false;
                            }
                        }

                        if(sillas[isJesus() + 1].enfermedad)
                        {
                            if(sillas[isJesus() + 1].enfermedad !== "Paranoia")
                            {
                                //console.log(`9`);
                                resultado = false;
                            }
                        }
                    }
                }
            }
        }
        else
        {
            if(isGuardia3() >= 0)
            {
                if(isParanoia() >= 0)
                {
                    //y z
                    if(isParanoia() - isGuardia3() !== 1)
                    {
                        //console.log(`10`);
                        resultado = false;
                    }
                    else
                    {
                        if(sillas[isGuardia3()].nombre)
                        {
                            if(sillas[isGuardia3()].nombre !== "Jesús")
                            {
                                //console.log(`11`);
                                resultado = false;
                            }
                        }
                    }
                }
                else
                {
                    //y
                    if(isGuardia3() === 5)
                    {
                        //console.log(`12`);
                        resultado = false;
                    }
                    else
                    {
                        if(sillas[isGuardia3()].nombre)
                        {
                            if(sillas[isGuardia3()].nombre !== "Jesús")
                            {
                                //console.log(`13`);
                                resultado = false;
                            }
                        }

                        if(sillas[isGuardia3() + 1].enfermedad)
                        {
                            if(sillas[isGuardia3() + 1].enfermedad !== "Paranoia")
                            {
                                //console.log(`14`);
                                resultado = false;
                            }
                        }
                    }
                }
            }
            else{
                if(isParanoia() >= 0)
                {
                    //z
                    if(isParanoia() === 0)
                    {
                        //console.log(`15`);
                        resultado = false;
                    }
                    else
                    {
                        if(sillas[isParanoia() - 1].nombre)
                        {
                            if(sillas[isParanoia() - 1].nombre !== "Jesús")
                            {
                                //console.log(`16`);
                                resultado = false;
                            }
                        }

                        if(sillas[isParanoia() - 1].guardias)
                        {
                            if(sillas[isParanoia() - 1].guardias !== 3)
                            {
                                //console.log(`17`);
                                resultado = false;
                            }
                        }
                    }
                }
            }
        }
    }

    return resultado;
}

//Hay una persona que gana los mismos miles de € que la edad que tiene
function validarPista22()
{
    let resultado = null;
    let cont = 0;
    let cincuenta = false;
    let sesenta = false;

    for(let i = 0; i<6; i++)
    {
        if(sillas[i].edad && sillas[i].salario)
        {
            if(sillas[i].edad === 60 && sillas[i].salario === "60 mil €")
            {
                sesenta = true;
            }
            else
            {
                if(sillas[i].edad === 55 && sillas[i].salario === "55 mil €")
                {
                        cincuenta = true;
                }
            }

            cont++;
        }
    }

    if(sesenta && cincuenta)
    {
        resultado = false;
    }
    else
    {
        if(sesenta || cincuenta)
        {
            resultado = true;
        }
        else
        {
            if(cont === 5)
            {
                resultado = false;
            }
        }
    }

    return resultado;
}

function validarPista23()
{
    let cont = 0;
    for(let i = 0; i<6; i++)
    {
        if(sillas[i].nombre
            && sillas[i].especialidad
            && sillas[i].edad
            && sillas[i].guardias
            && sillas[i].bata
            && sillas[i].enfermedad
            && sillas[i].salario
            && sillas[i].hospital
        )
        {
            cont++;
        }
    }

    let resultado = null;
    if(cont === 6)
    {
        resultado = true;
    }
    return resultado;
}