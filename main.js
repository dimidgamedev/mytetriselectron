const { app, BrowserWindow, Menu, MenuItem } = require('electron')
const { dialog } = require('electron')

let win


const dialogRulesOptions = {
    type: 'info',
    title: 'Правила Игры',
    buttons: ['OK'],
    defaultId: 0,
    massege: 'message',
    detail: "Случайные фигурки тетрамино падают сверху в прямоугольный стакан шириной 10 и " +
    "высотой 20 клеток. В полёте игрок может поворачивать фигурку на 90° и двигать её " +
    " по горизонтали. Также можно «сбрасывать» фигурку, то есть ускорять её падение, " +
    " когда уже решено, куда фигурка должна упасть. " +
    " Фигурка летит до тех пор, пока не наткнётся на другую фигурку либо на дно стакана. " +
    " Если при этом заполнился горизонтальный ряд из 10 клеток, он пропадает и всё, " +
    " что выше него, опускается на одну клетку. " +
    " Темп игры может постепенно увеличивается. " +
    " Игра заканчивается, когда новая фигурка не может поместиться в стакан. " +
    " Игрок получает очки за каждый заполненный ряд, поэтому его задача — заполнять ряды, " +
    " не заполняя сам стакан (по вертикали) как можно дольше, " +
    " чтобы таким образом получить как можно больше очков." +
    " Очки могут начисляться за убранные линии." +
    " За падающие блоки также увеличивается счетчик блоков."
}

const dialogAboutOptions = {
    type: 'info',
    title: 'О Проекте',
    buttons: ['OK'],
    defaultId: 0,
    massege: 'message',
    detail: "Курсовая работа: Игра в Тетрис на JavaScript с применением технологии Electron." 
}

const menuTemplate = [
    {
        label: 'Меню',
        submenu: [
            { 
                label: 'Правила игры',
                click () {
                    dialog.showMessageBox(null, dialogRulesOptions, (response) => {})
                }
            },
            { 
                label: 'Об авторе',
                click () {
                    dialog.showMessageBox(null, dialogAboutOptions, (response) => {})
                }
            },
            {type:'separator'},
            {
                label: 'Выход',
                click () {
                    app.quit()
                }
            }
        ]
    }
]

const menu = Menu.buildFromTemplate(menuTemplate)
Menu.setApplicationMenu(menu)


createWindow = () => {
    win = new BrowserWindow({ width: 1200, height: 900 })
    win.loadFile('index.html')
    win.on('closed', () => {
        win = null
    })
}

app.on('ready', createWindow)
app.on('window-all-closed', () => {
    if (process.platform != 'darwin') {
        app.quit()
    }
})
app.on('activate', () => {
    if (win === null) {
        createWindow()
    }
})