class move{
    constructor(){
        this.home=this.home.bind(this);
        this.about=this.about.bind(this);
        this.hihi=this.hihi.bind(this);
    }
    home(req,res){
        res.send('welcome to home');
    }

    about(req,res){
        res.send('welcome to about');
    }
    hihi(req,res){
        res.send('welcome to hihi');
    }
}

module.exports = move;