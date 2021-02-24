export const checkField = (text: React.FormEvent<HTMLInputElement>) => {
    if (text.currentTarget.className === "horario") {
        text.currentTarget.value = text.currentTarget.value.replace(/([0-2]{1})([0-9]{1})(\d)$/, "$1$2:$3");
        if (text.currentTarget.value > "2400") text.currentTarget.value = "00:00";
    }

    if (text.currentTarget.id === "cnpj") {
        const reCnpj = /([0-9]{2}?[0-9]{3}[.]?[0-9]{3}[/]?[0-9]{4}[-]?[0-9]{2})|([0-9]{3}[.]?[0-9]{3}[.]?[0-9]{3}[-]?[0-9]{2})/
        return reCnpj.test(text.currentTarget.value);
    }
    if (text.currentTarget.id === "website") {
        const reWeb = /[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&//=]*)/
        return reWeb.test(text.currentTarget.value);

    }

    if (text.currentTarget.id === "email") {
        const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(text.currentTarget.value);
    }
    if (text.currentTarget.id === "email") {
        const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(text.currentTarget.value);
    }

    if (text.currentTarget.id === "password") {
        const re = /^(?=.*\d+)(?=.*[a-zA-Z])[0-9a-zA-Z!@#$%]{6,10}$/
        return re.test(text.currentTarget.value);
    }
}

export const handleMask = (id: React.FormEvent<HTMLInputElement>) => {
    id.currentTarget.value = id.currentTarget.value.replace(/\D/g, "");
    if (id.currentTarget.id === "telefone") {
        //Remove tudo o que não é dígito
        id.currentTarget.value = id.currentTarget.value.replace(/^(\d{2})(\d)/g, "($1) $2"); //Coloca parênteses em volta dos dois primeiros dígitos
        id.currentTarget.value = id.currentTarget.value.replace(/(\d)(\d{4})$/, "$1-$2");
    }  //Coloca hífen entre o quarto e o quinto dígitos
    if (id.currentTarget.id === "cnpj") {
        if (id.currentTarget.value.length <= 11) {
            id.currentTarget.value = id.currentTarget.value.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/g, "$1.$2.$3-$4");
        } else {
            id.currentTarget.value = id.currentTarget.value.replace(/(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/g, "$1.$2.$3/$4-$5");
        }
    }
    if (id.currentTarget.id === "inscricao") {
        id.currentTarget.value = id.currentTarget.value.replace(/(\d{3})(\d{3})(\d{3})(\d{3})/g, "$1.$2.$3.$4");
    }
}