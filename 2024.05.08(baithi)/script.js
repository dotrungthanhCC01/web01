function sum(){
    var a = parseFloat(document.getElementById("inputA").value);
    var b = parseFloat(document.getElementById("inputB").value);
    if (isNaN(a) || isNaN(b)) {
        document.getElementById("result").innerText ="yeu cau nguoi dung nhap lai."
    } else {
        document.getElementById("result").innerText ="KET QUA: " + (a + b);
    }
}

function subtract(){
    var a = parseFloat(document.getElementById("inputA").value);
    var b = parseFloat(document.getElementById("inputB").value);
    if (isNaN(a) || isNaN(b)) {
        document.getElementById("result").innerText ="yeu cau nguoi dung nhap lai."
    } else {
        document.getElementById("result").innerText ="KET QUA: " + (a - b);
    }
}

function multiply(){
    var a = parseFloat(document.getElementById("inputA").value);
    var b = parseFloat(document.getElementById("inputB").value);
    if (isNaN(a) || isNaN(b)) {
        document.getElementById("result").innerText ="yeu cau nguoi dung nhap lai."
    } else {
        document.getElementById("result").innerText ="KET QUA: " + (a * b);
    }
}

function divide(){
    var a = parseFloat(document.getElementById("inputA").value);
    var b = parseFloat(document.getElementById("inputB").value);
    if (isNaN(a) || isNaN(b)) {
        document.getElementById("result").innerText ="yeu cau nguoi dung nhap lai."
    } else {
        document.getElementById("result").innerText ="KET QUA: " + (a / b);
    }
}

function reset(){
    document.getElementById("inputA").value ="";
    document.getElementById("inputB").value ="";
    document.getElementById("result").innerText ="";
}