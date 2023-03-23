import { useEffect, useMemo } from "react";
import mainActions from "../store/actions/mainActions";
import { useDispatch, useSelector } from "react-redux";
import { Checkbox, Drawer, Button, Radio, Space } from 'antd';

import { useState } from "react";
import { MenuOutlined } from '@ant-design/icons';

const Main = () => {
    const dispatch = useDispatch()
    const { list } = useSelector((state) => state.mainReducer)
    const [circleChecked, setCircleChecked] = useState(true)
    const [squareChecked, setSquareChecked] = useState(true)
    const [trgleChecked, settrgleChecked] = useState(true)
    const [open, setOpen] = useState(false);
    const [colors, setColors] = useState([]);
    const [colorsCheckbox, setColorsCheckbox] = useState(colors);
    const [colorsUpdate, setColorsUpdate] = useState(false);
    const [value, setValue] = useState("all");
    const filteredList = useMemo(() => filterArray(list), [list, circleChecked, squareChecked, trgleChecked, value, colorsCheckbox.length]);

    useEffect(() => {
        dispatch(mainActions.loadJsonList())
    }, [])

    useEffect(() => {
        let colors = []
        list?.forEach(elem => {
            if (!colors.includes(elem.color) && elem.color !== 'greed') {
                colors.push(elem.color)
            }
        })
        setColors(colors)
        setColorsCheckbox(colors)
    }, [list])

    const showDrawer = () => {
        setOpen(true);
    };

    const onClose = () => {
        setOpen(false);
    };

    const onChange = (e) => {
        if (e.target.name === 'circle') {
            setCircleChecked(e.target.checked)
        } else if (e.target.name === 'square') {
            setSquareChecked(e.target.checked)
        } else if (e.target.name === 'triangle') {
            settrgleChecked(e.target.checked)
        }
    }

    const onChange1 = (e) => {
        setValue(e.target.value);
    };

    const onColorChange = (e) => {
        let newList = colorsCheckbox
        if (e.target.checked) {
            newList.push(e.target.name)
        } else {
            newList = newList.filter(elem => elem !== e.target.name)
        }
        setColorsCheckbox(newList)
        setColorsUpdate(!colorsUpdate)
    }

    function filterArray(list) {
        let newList1 = list.filter(elem => circleChecked && (elem.form === 'circle' || elem.form === 'circa'))
        let newList2 = list.filter(elem => squareChecked && elem.form === 'square')
        let newList3 = list.filter(elem => trgleChecked && elem.form === 'triangle')
        let filteredArr = newList1.concat(newList2).concat(newList3)
        let colorFilter = filteredArr.filter(elem => colorsCheckbox.some(item => item === elem.color))

        let arr = colorFilter.filter(el => {
            if (value === "dark" && el.dark) {
                return true
            } else if (value === "light" && !el.dark) {
                return true
            } else if (value === "all") {
                return true
            } else {
                return false
            }
        })

        return arr
    }

    return (
        <div>
            <h1>Круги и квадраты, v.1.0</h1>
            <div className="row">
                <Button type="primary" onClick={showDrawer} style={{ marginRight: '20px' }}>
                    <MenuOutlined />
                </Button>
                <Checkbox onChange={onChange} checked={circleChecked} name="circle">Circle</Checkbox>
                <Checkbox onChange={onChange} checked={squareChecked} name="square">Square</Checkbox>
                <Checkbox onChange={onChange} checked={trgleChecked} name="triangle">Triangle</Checkbox>
            </div>

            <div className="grid">
                {
                    filteredList.map((item, i) => (
                        <div key={i}
                            className={'div-' + item.form}
                            style={{
                                backgroundColor: item.form !== 'triangle' ? item.color : 'transparent',
                                filter: `brightness(${item.dark ? 0.5 : 1.5})`,
                                borderBottomColor: item.color,
                            }}>
                        </div>
                    ))
                }
            </div>
            <Drawer
                title="Filters"
                placement={'left'}
                closable={false}
                onClose={onClose}
                open={open}
            >
                <div>
                    {colors?.map(item => (
                        <div key={item} className="container">
                            <label className="container">
                                <input type="checkbox" checked={colorsCheckbox?.includes(item)} onChange={onColorChange} name={item} />
                                <span className="checkmark" style={{ backgroundColor: item }}></span>
                                {item}
                            </label>
                        </div>
                    ))}
                    <Radio.Group onChange={onChange1} value={value}>
                        <Space direction="vertical">
                            <Radio value="all">Все</Radio>
                            <Radio value="dark">Темные</Radio>
                            <Radio value="light">Светлые</Radio>
                        </Space>
                    </Radio.Group>
                </div>
            </Drawer>
        </div>
    )
}

export default Main;