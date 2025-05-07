import React, { useState, useEffect } from "react";

export default function EtudiantList() {
  const [students, setStudents] = useState([]);
  const [filteredStudents, setFilteredStudents] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const studentsPerPage = 10;

  // Générer 50 étudiants factices
  useEffect(() => {
    const fakeStudents = Array.from({ length: 50 }, (_, i) => ({
      id: i + 1,
      nom: `Nom${i + 1}`,
      prenom: `Prenom${i + 1}`,
      email: `etudiant${i + 1}@exemple.com`,
      classe: `Classe ${((i % 5) + 1)}`,
    }));
    setStudents(fakeStudents);
    setFilteredStudents(fakeStudents);
  }, []);

  // Rechercher par nom ou prénom
  const handleSearch = () => {
    const term = searchTerm.toLowerCase();
    const results = students.filter(
      (s) =>
        s.nom.toLowerCase().includes(term) ||
        s.prenom.toLowerCase().includes(term)
    );
    setFilteredStudents(results);
    setCurrentPage(1); // Réinitialiser à la première page
  };

  // Pagination
  const totalPages = Math.ceil(filteredStudents.length / studentsPerPage);
  const indexOfLastStudent = currentPage * studentsPerPage;
  const indexOfFirstStudent = indexOfLastStudent - studentsPerPage;
  const currentStudents = filteredStudents.slice(indexOfFirstStudent, indexOfLastStudent);

  const changePage = (pageNumber) => {
    if (pageNumber >= 1 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Liste des étudiants</h2>

      {/* Barre de recherche */}
      <div className="flex items-center gap-2 mb-4">
        <input
          type="text"
          placeholder="Rechercher par nom ou prénom"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="border px-3 py-1 rounded w-64"
        />
        <button
          onClick={handleSearch}
          className="bg-blue-500 text-white px-4 py-1 rounded"
        >
          Rechercher
        </button>
      </div>

      {/* Table étudiants */}
      <table className="min-w-full border border-gray-300 mb-4">
        <thead className="bg-gray-200">
          <tr>
            <th className="p-2 border">ID</th>
            <th className="p-2 border">Nom</th>
            <th className="p-2 border">Prénom</th>
            <th className="p-2 border">Email</th>
            <th className="p-2 border">Classe</th>
          </tr>
        </thead>
        <tbody>
          {currentStudents.length > 0 ? (
            currentStudents.map((student) => (
              <tr key={student.id}>
                <td className="p-2 border">{student.id}</td>
                <td className="p-2 border">{student.nom}</td>
                <td className="p-2 border">{student.prenom}</td>
                <td className="p-2 border">{student.email}</td>
                <td className="p-2 border">{student.classe}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td className="p-2 border text-center" colSpan="5">
                Aucun étudiant trouvé.
              </td>
            </tr>
          )}
        </tbody>
      </table>

      {/* Pagination */}
      <div className="flex gap-2 items-center flex-wrap">
        <button
          onClick={() => changePage(currentPage - 1)}
          disabled={currentPage === 1}
          className="px-3 py-1 border rounded disabled:opacity-50"
        >
          Précédent
        </button>

        {[...Array(totalPages).keys()].map((page) => (
          <button
            key={page + 1}
            onClick={() => changePage(page + 1)}
            className={`px-3 py-1 border rounded ${
              currentPage === page + 1 ? "bg-blue-500 text-white" : ""
            }`}
          >
            {page + 1}
          </button>
        ))}

        <button
          onClick={() => changePage(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="px-3 py-1 border rounded disabled:opacity-50"
        >
          Suivant
        </button>
      </div>
    </div>
  );
}
