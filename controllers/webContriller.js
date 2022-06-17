const webControllers = {
    inicio: (req, res) => {
        res.sendFile('index.html')
    }
}

export default webControllers;