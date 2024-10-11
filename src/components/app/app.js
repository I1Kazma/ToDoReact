import { Component } from 'react';

import AppInfo from '../app-info/app-info';
import SearchPanel from '../search-panel/search-panel';
import AppFilter from '../app-filter/app-filter';
import EmployeesList from '../employees-list/employees-list';
import EmployeesAddForm from '../employees-add-form/employees-add-form';
import './app.css';

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [
                {
                    name: 'John',
                    salary: 800,
                    increase: false,
                    rise: true,
                    id: 1,
                },
                {
                    name: 'Alex',
                    salary: 100,
                    increase: true,
                    rise: false,
                    id: 2,
                },
                {
                    name: 'Ivan',
                    salary: 3000,
                    increase: false,
                    rise: false,
                    id: 3,
                },

            ],
            term: '',
            filter: 'all',
        }
        this.maxId = 4;
    }

    onToggleProp = (id, prop) => {
        this.setState(({ data }) => ({
            data: data.map(item => {
                if (item.id === id) {
                    return { ...item, [prop]: !item[prop] }
                }
                return item;
            })
        }))
    }


    deleteItem = (id) => {
        this.setState(({ data }) => {

            return {
                data: data.filter(item => item.id !== id),
            }
        })
    }

    addItem = (name, salary) => {

        const newItem = {
            name,
            salary,
            increase: false,
            rise: false,
            id: this.maxId++,
        }

        this.setState(({ data }) => {
            const newArr = [...data, newItem]
            return {
                data: newArr,
            }
        })
    }

    searchEmployee = (items, filter) => {
        if (filter.length === 0) {
            return items;
        }

        return items.filter(item => {
            return item.name.indexOf(filter) > -1
        })
    }

    filterPost = (items, filter) => {
        switch (filter) {
            case 'Rise':
                return items.filter(item => item.rise)
            case 'moreThan1000':
                return items.filter(item => item.salary > 1000)
            default:
                return items
        }

    }

    onUpdateSearch = (term) => {
        this.setState({ term })
    }


    onUpdateFilter = (filter) => {
        this.setState({ filter })
    }

    render() {
        const { data, term, filter } = this.state;
        const visibleData = this.filterPost(this.searchEmployee(data, term), filter)
        const employees = this.state.data.length;
        const increased = this.state.data.filter(item => item.increase).length;

        return (
            <div className="app" >
                <AppInfo employees={employees} increased={increased} />

                <div className="search-panel">
                    <SearchPanel onUpdateSearch={this.onUpdateSearch} />
                    <AppFilter filter={filter} onUpdateFilter={this.onUpdateFilter} />
                </div>

                <EmployeesList data={visibleData}
                    onDelete={this.deleteItem}
                    onToggleProp={this.onToggleProp}
                />
                <EmployeesAddForm onAddEmployee={this.addItem} />
            </div>
        )
    }
}

export default App;