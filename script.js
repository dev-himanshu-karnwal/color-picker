const button = document.querySelector('button');
const resultElement = document.querySelector('.result');

let mes = false;

const colorPicker = function () {
    if (!window.EyeDropper) {
        resultElement.textContent = "Your browser does not support the EyeDropper API";
        return;
    }

    if (!mes) {
        alert(`Pick Color by draging cursor.
Esacpe by pressing Esc
Auto cancel after 20 seconds`);
        mes = true;
    }

    const eyeDropper = new EyeDropper();
    const abort = new AbortController();

    eyeDropper
        .open({ signal: abort.signal })
        .then(res => {
            const { sRGBHex } = res;
            const col = sRGBHex.toUpperCase();
            resultElement.textContent = col;
            // resultElement.style.backgroundColor = col
            resultElement.style.border = `10px ${col} solid`;

        })
        .catch((err) => {
            console.log(err);
            if (err.message == `Failed to execute 'open' on 'EyeDropper': The user canceled the selection.`)
                alert('User canceled the selection');
            else
                alert('Canceled as 20 seconds passed');
        })

    setTimeout(() => abort.abort(), 20_000);
}
button.addEventListener('click', colorPicker);