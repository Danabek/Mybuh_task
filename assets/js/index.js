var mb_employes = (function () {
    units = {},
        data = {
            sysName: "mb_employes",
            employes: [
                {
                    id: 1,
                    name: "Данабек",
                    status: {
                        resident: true,
                        pensioner: false,
                        invalid: false

                    },
                    salaries: {
                        "10.10.2010": 85000,
                        "15.15.2015": 130000,
                        "01.11.2020": 180000,

                    }

                },
                {
                    id: 2,
                    name: "Данабек",
                    status: {
                        resident: true,
                        pensioner: false,
                        invalid: false

                    },
                    salaries: {
                        "10.10.2010": 85000,
                        "15.15.2015": 130000,
                        "01.11.2020": 180000,

                    }

                },
                {
                    id: 3,
                    name: "Данабек",
                    status: {
                        resident: true,
                        pensioner: false,
                        invalid: false

                    },
                    salaries: {
                        "10.10.2010": 85000,
                        "15.15.2015": 130000,
                        "01.11.2020": 180000,

                    }

                }
            ],
        };

    function SE(p, o, v, f, r, s) {
        if (!o) return;
        switch (p) {
            case "click":
                o.addEventListener(v, function (event) {
                    s[f](event.target);
                });
                break;
            default:
                return;

        }

    }
    return {
        init: function () {
            console.log(units.data);
            this.getUnits(data.sysName, document.body, units);
            this.getUnits('layout', document.body, units);

            SE("click", units.emp_list, "click", "edit", "", this);
            SE("click", units["modal-edit-contact"], "click", "accept", "", this);
            SE("click", units["modal-edit-contact"], "click", "cancel", "", this);

            SE("click", units.create, "click", "createEmp", "", this);
            SE("click", units.export, "click", "send", "", this);

            this.render()
        },

        getUnits: function (name, dom, units) {
            var d = dom.getElementsByTagName('*');
            for (var i = 0; i < d.length; i++) {
                if (name && d[i].getAttribute('data-name') == name) {
                    var id = d[i].getAttribute('data-id');
                    if (id)
                        units[id] = d[i];
                }
            }
        },

        target: function (elem) {
            if (elem === units.edit) {

            }
        },

        send: async function () {
            console.log(data.employes);
            let response = await fetch('ajax.php', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json;charset=utf-8'
                },
                body: JSON.stringify("alfaBank")
            });

            let result = await response.json();
            


        },

        test(){
            console.log(units);
        },

        edit: function (target) {
            console.log("asd")

            

            if (target.closest("button") === null) return;
            else if (target.closest("button").dataset.id === "employee_edit__btn") {
                let tr = target.closest("tr")
                let inputs = tr.querySelectorAll('input, select')
                tr.querySelector('td[data-id="employee_cancel"]').classList.remove('collapsed')
                tr.querySelector('td[data-id="employee_accept"]').classList.remove('collapsed')
                tr.querySelector('td[data-id="employee_edit"]').classList.add('collapsed')
                tr.querySelector('td[data-id="employee_menu"]').classList.add('collapsed')

                console.log(inputs);

                for (let i = 0; i < inputs.length; i++) {
                    inputs[i].removeAttribute("disabled");
                }

                let hash = target.closest("tr").dataset.hash;
                //     data.employes.map( (item) => {
                //         hash === item.id ? {id: item.id, }
                //     })
                // employee.id === index ? { id: employee.id,  name: nameUpdated, post: postUpdated, salary: salaryUpdated, exp: expUpdated} : employee


            }
        },

        cancel: function (target) {
            if (target.closest("button") === null) return;
            else if (target.closest("button").dataset.id === "employee_cancel__btn") {
                let tr = target.closest("tr")
                let inputs = tr.querySelectorAll('input, select')

                tr.querySelector('td[data-id="employee_cancel"]').classList.add('collapsed')
                tr.querySelector('td[data-id="employee_accept"]').classList.add('collapsed')
                tr.querySelector('td[data-id="employee_edit"]').classList.remove('collapsed')
                tr.querySelector('td[data-id="employee_menu"]').classList.remove('collapsed')
                for (let i = 0; i < inputs.length; i++) {
                    inputs[i].setAttribute("disabled", "");
                }
            }

        },

        accept: function (target) {
            if (target.closest("button") === null) return
            else if (target.closest("button").dataset.id === "employee_accept__btn") {
                let hash = target.closest("tr").dataset.hash
                let tr = target.closest("tr")
                let name = tr.querySelector("input[name='name']").value
                let post = tr.querySelector("input[name='post']").value
                let status = tr.querySelector("select[name='status']").value
                let salary = tr.querySelector("input[name='salary']").value
                let inputs = tr.querySelectorAll('input, select')

    
                data.employes = data.employes.map((item) => {
                    if (parseInt(hash) == item.id) {
                        return { id: item.id, name, post, status, salary }
                    } else {
                        return item
                    }
                })
                tr.querySelector('td[data-id="employee_cancel"]').classList.add('collapsed')
                tr.querySelector('td[data-id="employee_accept"]').classList.add('collapsed')
                tr.querySelector('td[data-id="employee_edit"]').classList.remove('collapsed')
                tr.querySelector('td[data-id="employee_menu"]').classList.remove('collapsed')
                for (let i = 0; i < inputs.length; i++) {
                    inputs[i].setAttribute("disabled", "");
                }
                console.log(data.employes)
            }
        },

        createEmp: function () {
            console.dir(units.emp_list)
            let elem = units.emp_list.children[units.emp_list.children.length - 1];
            let hash = parseInt(data.employes[data.employes.length - 1].id) + 1;
            units.emp_list.insertAdjacentHTML('beforeEnd', elem.innerHTML);

            elem = units.emp_list.children[units.emp_list.children.length - 1];

            
            elem.setAttribute("data-name", data.sysName);
            elem.setAttribute("data-id", "emp");
            elem.setAttribute("data-hash", hash);

            data.employes.push({ id: hash, name: null, status: null, salaries: null })

            units.employes_amount.innerHTML = data.employes.length;
        },
        render() {
            let elem = units.emp_list.children[units.emp_list.children.length - 1];
            let name = elem.querySelector('input[name="name"]');
            let post = elem.querySelector("input[name='post']");
            let status = elem.querySelector("selected[name='status']");
            let salary = elem.querySelector("input[name='salary']");

            units.employes_amount.innerHTML = data.employes.length;

            for (let i = 0; i < data.employes.length; i++) {
                console.log(name);
                
                units.emp_list.insertAdjacentHTML('beforeEnd', elem.innerHTML);
                elem = units.emp_list.children[units.emp_list.children.length - 1];

                elem.setAttribute("data-hash", data.employes[i].id);
                name.value = data.employes[i].name;
                post.value = data.employes[i].post;
                // status.value = data.employes[i].status
                // salary.value = data.employes[i].salary    
            }
        }
    }
})();