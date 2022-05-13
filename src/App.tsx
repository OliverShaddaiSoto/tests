import { useEffect, useState } from 'react'


function App() {
  const getUsers = () => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve([
          { id: 1, name: 'Antonio', gender: 'male', status: 'active', salary: 1000 },
          { id: 2, name: 'Rosa', gender: 'female', status: 'active', salary: 1000 },
          { id: 3, name: 'Joseph', gender: 'male', status: 'inactive', salary: 2000 },
          { id: 4, name: 'Lisa', gender: 'female', status: 'active', salary: 2000 },
          { id: 5, name: 'Gwen', gender: 'female', status: 'inactive', salary: 3000 },
          { id: 6, name: 'Antonio', gender: 'male', status: 'inactive', salary: 3000 }
        ]);
      }, 1000);
    });
  }

  const getCompanies = () => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve([
          { id: 1, name: 'Disney', employees: [1, 3], status: 'inactive' },
          { id: 2, name: 'Nestle', employees: [4], status: 'active' },
          { id: 3, name: 'Microsoft', employees: [2, 5, 6], status: 'active' }
        ]);
      }, 3000);
    });
  }


  const mergeUsers = (users: any , companies: any) => {
    return companies.map((company: any) => {
      const employees = users.filter((user:any) => company.employees.includes(user.id));
      
      return { ...company, employees };
    });
  };

  const ableCompanies = (companies: any) => {
    const activeCompanies = new Array();
    companies.map((company: any) => {
      if (company.status === 'active') {
        activeCompanies.push(company)
      }
    })
    return activeCompanies;
  }

  const unableUsers = (users: any) => {
    const inactiveUsers = new Array();
    users.map((user: any) => {
      if (user.status === 'inactive') {
        inactiveUsers.push(user);
      }
    })
    return inactiveUsers;
  }
  

  const [companies, setCompanies] = useState<any[]>([]);
  const [users, setUsers] =  useState<any[]>([]);
  

useEffect( () => {
  (async () => {
    const users = await getUsers();
    const companies = await getCompanies();
    const mergedData = mergeUsers(users, companies);
    const arrayList = Object.values(mergedData);
    const unabledCompanies = ableCompanies(companies);
    const abledUsers = unableUsers(users);
    const mergedData2 = mergeUsers(abledUsers, unabledCompanies);
    const arrayList2 = Object.values(mergedData2);
    setCompanies(arrayList);
    setUsers(arrayList2);
  })()
}, [])





  return (
    <div className="App">
      <ul>
        {
          companies.map((companie, k) => {
            return(
              <li key={k}>
                {companie.name}
                <ol>
                  {
                    (companie.employees as any[]).map((employee, i) => {
                      return(
                        <li key={i}>
                          {employee.name}
                        </li>
                      )
                    })
                  }
                </ol>
              </li>
            )
          })
        }
      </ul>
      <br />
      Usuarios inactivos en Empresas activas
      <ul>
        {
          users.map((users, k) => {
            return(
              <li key={k}>
                {users.name}
                <ol>
                  {
                    (users.employees as any[]).map((employee, i) => {
                      return(
                        <li key={i}>
                          {employee.name}
                        </li>
                      )
                    })
                  }
                </ol>
              </li>
            )
          })
        }
      </ul>
    </div>
  )
}

export default App
