export const validarCampoVacio = (e) => {
    const input = e.target;
    input.value.trim() ? clearError(input) : setError(input, "Campo requerido");
  };

  

export const validarNumeroEntero = (e) => 
{
    const patron = /(^\d{1,10}$)/g;
    const input = e.target;
    const valorDelInput = input.value.trim();

    if(patron.test(valorDelInput) && valorDelInput >=0 && valorDelInput <=50000)
    {
        clearError(input);
    }
    else
    {
        setError(input, "Reingrese nuevamente el precio. Debe ser un numero entre 0 y 50000");
    }
}

export function validarSubmit(controles)
{
    let submitOk = true;
    for(let i = 0; i < controles.length; i++)
    {
        const control = controles.item(i);
        if(control.matches("input"))
        {     
            if((control.matches("[type=number]") && control.value.trim() == "") || (control.matches("[type=text]") && (control.value.trim() == "" || control.value.trim() == null)))
            {
                setError(control);
                submitOk = false;
            }
        }
    }
    return submitOk;
}

export const validarNumerosYLetras = (e) =>
{
    const patron = /^[A-Za-z0-9\s]+[A-Za-z0-9_.,ñ\s]+$(\.0-9+)?/g;
    const input = e.target;
    const valorDelInput = input.value.trim();

    if(patron.test(valorDelInput) && valorDelInput.length <= "25")
    {
        clearError(input);
    }
    else
    {
        setError(input, "El campo debe contener como maximo 25 caracteres.");
    }
}

const setError = (input, mensaje) => {
    const $small = input.nextElementSibling;
    $small.textContent = mensaje || `${input.name} requerido`;
    input.classList.remove("inputOk");
    input.classList.add("inputError");
    $small.classList.add("danger");
};

const clearError = (input, mensaje) => {
    const $small = input.nextElementSibling;
    $small.textContent = "";
    input.classList.add("inputOk");
    input.classList.remove("inputError");
    $small.classList.remove("danger");
};
  