const GameState = Object.freeze({
    WELCOMING:   Symbol("welcoming"),
    GRAVE:   Symbol("grave"),
    DEPOSIT:  Symbol("deposit"),
    WITHDRAW: Symbol("withdraw"),
    ELSE: Symbol("else"),
    RECEIPT: Symbol("receipt"),
    EMAIL: Symbol("email"),
    ADDRESS: Symbol("address"),
    QUESTION: Symbol("question"),
    ATM: Symbol("atm"),
    PHONE: Symbol("phone"),
    BALANCE: Symbol("balance")
});

export default class Game{
    constructor(){
        this.stateCur = GameState.WELCOMING;
    }
    
    makeAMove(sInput)
    {
        let sReply = "Hi I'm Igor, your spooky bank chat buddy. Can I have your grave number (enter 1234)?";
        switch(this.stateCur){
            case GameState.WELCOMING:
                this.stateCur = GameState.GRAVE;
                break;
            case GameState.GRAVE:
                if(sInput.toLowerCase().match("1234")){
                    sReply = "Great, would you like to deposit, withdraw, check balance or do something else?";
                    sInput = this.sInput;
                    if(sInput.toLowerCase().match("deposit")){
                        this.stateCur = GameState.DEPOSIT;
                    }
                    else if(sInput.toLowerCase().match("withdraw")){
                        this.stateCur = GameState.WITHDRAW;
                    }
                    else if(sInput.toLowerCase().match("balance")){
                        this.stateCur = GameState.BALANCE;
                    }
                    else{
                        this.stateCur = GameState.ELSE;
                    }
                }
                else{
                    this.stateCur = GameState.WELCOMING;
                }
                break;
            case GameState.DEPOSIT:
                sReply = "How much do you want to deposit?";
                if(sInput.toLowerCase().match("/^[/d]$/")){
                    sReply = "Do you want a receipt?";
                    if(sInput.toLowerCase().match("yes")){
                        this.stateCur = GameState.RECEIPT;
                    }
                    else{
                        sReply = "Thank you for your business";
                        this.stateCur = GameState.WELCOMING;
                    }
                }
                else{
                    this.stateCur = GameState.WELCOMING;
                }
                break;
            case GameState.WITHDRAW:
                sReply = "How much do you want to withdraw?";
                if(sInput.toLowerCase().match("/^[/d]$/")){
                    sReply = "Do you want a receipt?";
                    if(sInput.toLowerCase().match("yes")){
                        this.stateCur = GameState.RECEIPT;
                    }
                    else{
                        sReply = "Thank you for your business";
                        this.stateCur = GameState.WELCOMING;
                    }
                }
                else{
                    this.stateCur = GameState.WELCOMING;
                }
                break;
            case GameState.BALANCE:
                sReply = "You have 1,00,000 heads. Congratulations!!!!!";
                this.stateCur = GameState.WELCOMING;
                break;
            case GameState.ELSE:
                sReply = "Would you like to update your data?";
                if(sInput.toLowerCase().match("yes")){
                    sReply = "Would you like to update your phone, email, address, security question or atm pin?";
                    if(sInput.toLowerCase().match("phone")){
                        this.stateCur = GameState.PHONE;
                    }
                    else if(sInput.toLowerCase().match("email")){
                        this.stateCur = GameState.EMAIL;
                    }
                    else if(sInput.toLowerCase().match("address")){
                        this.stateCur = GameState.ADDRESS;
                    }
                    else if(sInput.toLowerCase().match("question")){
                        this.stateCur = GameState.QUESTION;
                    }
                    else{
                        this.stateCur = GameState.ATM;
                    }
                }
                else{
                    this.stateCur = GameState.ELSE;
                }
                break;
            case GameState.PHONE:
                sReply = "Enter your phone number";
                if(sInput.toLowerCase().match("/^[0-9]{10}$/")){
                    sReply = "Your number has been updated";
                    this.stateCur = GameState.WELCOMING;
                }
                else{
                    sReply = "Enter correct number";
                    this.stateCur = GameState.PHONE;
                } 
                break;
            case GameState.EMAIL:
                sReply = "Enter your email address";
                if(sInput.toLowerCase().match("/^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/")){
                    sReply = "Your email has been updated";
                    this.stateCur = GameState.WELCOMING;
                }
                else{
                    sReply = "Enter correct email address";
                    this.stateCur = GameState.EMAIL;
                } 
                break;
            case GameState.ADDRESS:
                sReply = "Enter your address";
                if(sInput.toLowerCase().match("/^[/s]$/")){
                    sReply = "Your address has been updated";
                    this.stateCur = GameState.WELCOMING;
                }
                else{
                    sReply = "Enter correct address";
                    this.stateCur = GameState.ADDRESS;
                } 
                break;
            case GameState.QUESTION:
                sReply = "Enter your question";
                if(sInput.toLowerCase().match("/^[/s]$/")){
                    sReply = "Your question has been updated";
                    this.stateCur = GameState.WELCOMING;
                }
                else{
                    sReply = "Enter correct question";
                    this.stateCur = GameState.QUESTION;
                } 
                break;
            case GameState.ATM:
                sReply = "Enter your atm pin";
                if(sInput.toLowerCase().match("/^[/d]{4}$/")){
                    sReply = "Your atm pin has been updated";
                    this.stateCur = GameState.WELCOMING;
                }
                else{
                    sReply = "Enter correct pin";
                    this.stateCur = GameState.ATM;
                }
                break;
            case GameState.RECEIPT:
                sReply = "Here is your receipt";
                this.stateCur = GameState.WELCOMING;
                break;
        }
        return(sReply);
    }
}
