
import "./app-filter.css"

const AppFilter = (props) => {

    const buttonsData = [

        { name: 'all', label: 'Все сотрудники' },
        { name: 'Rise', label: 'На повышение' },
        { name: 'moreThan1000', label: ' З/П больше 1000$' },
    ]

    const buttons = buttonsData.map(({ name, label }) => {
        const active = props.filter === name;
        const clazz = active ? 'btn-light' : 'btn-outline-light';

        return (
            <button type="button"
                key={name}
                className={`btn ${clazz}`}
                onClick={() => props.onUpdateFilter(name)}
            >
                {label}
            </button>
        )
    })

    return (
        <div className="btn-group" >
            {buttons}
        </div>
    );
}

export default AppFilter;