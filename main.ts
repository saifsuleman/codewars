const stack: number[] = []

const functions = {
    mul: (a: number, b: number) => a  * b,
    div: (a: number, b: number) => a / b,
    add: (a: number, b: number) => a + b,
    sub: (a: number, b: number) => a - b
}

function push(n) {
    stack.push(n)
}

function apply(functionName) {
    if (stack.length < 2) {
        console.log(`too small stack!!!!`)
        return
    }
    const fn = functions[functionName]
    const last = stack.length - 1
    const elements = [stack[last - 1], stack[last]]
    stack.splice(stack.length - 2, stack.length)
    stack.push(fn(elements[0], elements[1]))
}

function isWhitespace(char: string): boolean {
    return /\S/.test(char)
}

function isDigit(char: string) {
    return /[0-9]/.test(char)
}

class Lexer {
    position: number
    char: string
    input: string

    public Lexer(input: string) {
        this.input = input
        this.position = 0
        this.char = this.input[0]
    }

    public peekChar(): string {
        const pos = this.position + 1
        return pos < this.input.length ? this.input[pos] : `\0`
    }

    public readChar(): string {
        const char = this.peekChar()
        this.position++
        this.char = char
        return char
    }

    public nextToken(): Token {
        while (isWhitespace(this.char)) this.readChar()

        let token: Token
        switch (this.char) {
            case '(':
                token = { type: `LBRACKET`, literal: this.char }
            case ')':
                token = { type: `RBRACKET`, literal: this.char }
            default:
                token = this.identifyToken()
        }
        this.readChar()
        return token
    }

    public identifyToken(): Token {

    }
}

interface Token {
    type: string
    literal: string
}

push(1)
push(2)
apply("div")
console.log(stack)