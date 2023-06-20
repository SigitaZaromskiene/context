import "./App.scss";
import AddNewExpenseForm from "./Components/AddNewExpenseForm";
import ExpensesForm from "./Components/ExpensesForm";
import { GlobalProvider } from "./Components/Global";
import ExpensesList from "./Components/ExpensesList";
import { useEffect, useState } from "react";
import { read, create } from "./Components/localStorage";
import Message from "./Components/Message";
import FilterComponent from "./Components/FilterComponent";

const localKey = "KEY";

function App() {
  const [lastUpdate, setLastUpdate] = useState(Date.now());
  const [dataList, setDataList] = useState(null);
  const [details, setDetails] = useState(null);
  const [formAdd, setFormAdd] = useState(false);
  const [primaryForm, setPrimaryForm] = useState(true);
  const [year, setYear] = useState("2023");
  const [message, setMessage] = useState("");

  console.log(message);

  useEffect(() => {
    setDataList(read(localKey));
  }, [lastUpdate]);

  useEffect(() => {
    if (details === null) {
      return;
    }
    create(localKey, details);
    setLastUpdate(Date.now());
  }, [details]);

  return (
    <GlobalProvider>
      <div className="app-container">
        <div className="app-content">
          {primaryForm ? (
            <AddNewExpenseForm
              setFormAdd={setFormAdd}
              setPrimaryForm={setPrimaryForm}
            />
          ) : null}
          <FilterComponent
            setDataList={setDataList}
            setYear={setYear}
            year={year}
          />
          {formAdd ? (
            <ExpensesForm setDetails={setDetails} setMessage={setMessage} />
          ) : null}

          <ExpensesList dataList={dataList} />
          {message ? <Message message={message} /> : null}
        </div>
      </div>
    </GlobalProvider>
  );
}

export default App;
