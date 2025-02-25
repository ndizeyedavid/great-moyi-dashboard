"use client";

import { useState, useCallback } from "react";

export default function Page() {
  const [activeTab, setActiveTab] = useState("tables");
  const [notifications, setNotifications] = useState(3);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedTable, setSelectedTable] = useState<PoolTable | null>(null);
  interface MaintenanceRecord {
    date: string;
    type: "routine" | "repair";
    description: string;
    cost: number;
  }

  interface RentalRecord {
    startTime: string;
    endTime: string;
    customerName: string;
    revenue: number;
  }

  interface PoolTable {
    id: number;
    name: string;
    price: string;
    likes: number;
    views: number;
    status: "Available" | "In Use" | "Maintenance";
    condition: number;
    lastMaintenance: string;
    maintenanceHistory: MaintenanceRecord[];
    rentalHistory: RentalRecord[];
    position: { x: number; y: number };
    dimensions: { length: number; width: number };
  }

  const [tables, setTables] = useState([
    {
      id: 1,
      name: "Pro Master 9ft",
      price: "$3,999",
      likes: 245,
      views: 1200,
      status: "Available",
      condition: 9.5,
      lastMaintenance: "2024-01-15",
      maintenanceHistory: [
        {
          date: "2024-01-15",
          type: "routine",
          description: "Felt cleaning and leveling",
          cost: 150,
        },
      ],

      rentalHistory: [
        {
          startTime: "2024-01-20T14:00",
          endTime: "2024-01-20T16:00",
          customerName: "John Smith",
          revenue: 45,
        },
      ],

      position: { x: 10, y: 20 },
      dimensions: { length: 9, width: 4.5 },
    },
    {
      id: 2,
      name: "Tournament Elite",
      price: "$5,499",
      likes: 189,
      views: 890,
      status: "In Use",
      condition: 8.5,
      lastMaintenance: "2024-01-10",
      maintenanceHistory: [],
      rentalHistory: [],
      position: { x: 30, y: 20 },
      dimensions: { length: 9, width: 4.5 },
    },
    {
      id: 3,
      name: "Classic 8ft",
      price: "$2,899",
      likes: 156,
      views: 750,
      status: "Maintenance",
      condition: 7.0,
      lastMaintenance: "2024-01-05",
      maintenanceHistory: [],
      rentalHistory: [],
      position: { x: 50, y: 20 },
      dimensions: { length: 8, width: 4 },
    },
  ]);

  const handleTableAction = useCallback((table: PoolTable) => {
    setSelectedTable(table);
    setIsModalOpen(true);
  }, []);

  const stats = [
    { label: "Total Revenue", value: "$12,345", change: "+12%" },
    { label: "Active Tables", value: "8", change: "+2" },
    { label: "Monthly Views", value: "2.4k", change: "+15%" },
    { label: "New Messages", value: "28", change: "+7" },
  ];

  const team = [
    { name: "Sarah Chen", role: "Store Manager", avatar: "👩🏻" },
    { name: "Mike Ross", role: "Sales Associate", avatar: "👨🏽" },
    { name: "Alex Kim", role: "Maintenance", avatar: "👨🏻" },
  ];

  const messages = [
    {
      from: "John Doe",
      subject: "Table Inquiry",
      status: "unread",
      time: "2h ago",
    },
    {
      from: "Lisa Wong",
      subject: "Booking Request",
      status: "read",
      time: "5h ago",
    },
    {
      from: "Tom Brady",
      subject: "Price Question",
      status: "replied",
      time: "1d ago",
    },
  ];

  return (
    <div
      className="flex min-h-screen bg-gradient-to-br from-gray-900 to-black"
      data-oid="-l4b_ug"
    >
      <nav className="w-64 bg-black border-r border-red-900" data-oid="26enmmx">
        <div className="p-6" data-oid="hf4yw4u">
          <div className="flex items-center mb-8 space-x-3" data-oid="pxj.hk1">
            <div
              className="flex items-center justify-center w-10 h-10 rounded-lg bg-gradient-to-br from-red-500 to-red-700"
              data-oid="frenhv:"
            >
              <span className="text-xl font-bold text-white" data-oid="o5ij4bf">
                GM
              </span>
            </div>
            <h1 className="text-2xl font-bold text-red-500" data-oid="_:msa7h">
              Great Moyi
            </h1>
          </div>
          <div className="space-y-2" data-oid="c5c6atz">
            {["tables", "team", "messages", "analytics"].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`w-full px-4 py-2 rounded-lg font-medium text-left ${
                  activeTab === tab
                    ? "bg-red-600 text-white"
                    : "text-gray-400 hover:bg-gray-800 hover:text-white"
                }`}
                data-oid="4c.77k."
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </button>
            ))}
          </div>
        </div>
      </nav>

      <div className="flex-1" data-oid="hb7lodr">
        {/* Header */}
        <header
          className="bg-gray-900 border-b border-red-900 shadow-lg"
          data-oid="gm4b50g"
        >
          <div
            className="px-4 py-4 mx-auto max-w-7xl sm:px-6 lg:px-8"
            data-oid="q_53o64"
          >
            <div
              className="flex items-center justify-between"
              data-oid="6i837wp"
            >
              <div className="flex items-center space-x-4" data-oid="5v1hbh7">
                <span
                  className="text-xl font-bold text-white"
                  data-oid="i6.fhi."
                >
                  Dashboard
                </span>
              </div>
              <div className="flex items-center space-x-4" data-oid="r_te3hh">
                <div className="relative" data-oid="x3ftqmv">
                  <span
                    className="absolute flex items-center justify-center w-5 h-5 text-xs text-white bg-red-600 rounded-full -top-1 -right-1"
                    data-oid="wd_67yw"
                  >
                    {notifications}
                  </span>
                  <button
                    className="p-2 text-red-500 transition-colors rounded-lg hover:bg-gray-800 hover:text-red-400"
                    data-oid="61inw4_"
                  >
                    <svg
                      className="w-6 h-6"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      data-oid="ak5eihk"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
                        data-oid="r45p9mg"
                      />
                    </svg>
                  </button>
                </div>
                <div className="flex items-center space-x-2" data-oid="28i7nn_">
                  <div
                    className="flex items-center justify-center w-10 h-10 font-bold text-white rounded-full bg-gradient-to-r from-red-600 to-red-800"
                    data-oid="zsafz-3"
                  >
                    GM
                  </div>
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main
          className="px-4 py-8 mx-auto max-w-7xl sm:px-6 lg:px-8"
          data-oid="35q5ixw"
        >
          {/* Stats Grid */}
          <div
            className="grid grid-cols-1 gap-6 mb-8 md:grid-cols-4"
            data-oid="qcgj_p8"
          >
            {stats.map((stat, index) => (
              <div
                key={index}
                className="p-6 transition-all duration-300 transform bg-gray-800 border rounded-xl hover:shadow-xl border-red-900/20 hover:border-red-500/30 hover:-translate-y-1"
                data-oid="sonyv_3"
              >
                <p className="text-sm text-gray-400" data-oid="ikhbon4">
                  {stat.label}
                </p>
                <div
                  className="flex items-center justify-between mt-2"
                  data-oid="c8-rsm6"
                >
                  <p
                    className="text-2xl font-bold text-white"
                    data-oid="4ictpci"
                  >
                    {stat.value}
                  </p>
                  <span
                    className="text-sm font-medium text-red-500"
                    data-oid="v2q:hqy"
                  >
                    {stat.change}
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* Content Sections */}
          <div
            className="p-6 bg-gray-800 border shadow-sm rounded-xl border-red-900/20"
            data-oid="f-py6l2"
          >
            {activeTab === "tables" && (
              <div className="space-y-4" data-oid="afl306a">
                <div
                  className="flex items-center justify-between mb-6"
                  data-oid="20bvrp4"
                >
                  <h2
                    className="text-xl font-bold text-gray-900"
                    data-oid="5zhj0d7"
                  >
                    Pool Tables
                  </h2>
                  <button
                    className="px-4 py-2 text-white bg-red-600 rounded-lg hover:bg-red-700"
                    data-oid="nb.sgb_"
                  >
                    Add New Table
                  </button>
                </div>
                <div
                  className="grid grid-cols-1 gap-6 md:grid-cols-3"
                  data-oid=":vwzzgg"
                >
                  <div className="mb-8" data-oid="q-6vbuf">
                    <div
                      className="p-4 mb-4 bg-gray-900 border rounded-lg border-red-900/20"
                      data-oid="7:en6th"
                    >
                      <h3
                        className="mb-2 text-lg font-semibold"
                        data-oid="zwq83a2"
                      >
                        Floor Plan
                      </h3>
                      <div
                        className="relative h-[400px] bg-gray-800 rounded border border-red-900/20 p-4"
                        data-oid="3kd0vsi"
                      >
                        {/* Grid Lines */}
                        <div
                          className="absolute inset-0 grid grid-cols-10 grid-rows-10"
                          data-oid="-2o02-d"
                        >
                          {[...Array(100)].map((_, i) => (
                            <div
                              key={i}
                              className="border border-gray-700/30"
                              data-oid="4t4b4dv"
                            />
                          ))}
                        </div>
                        {tables.map((table) => (
                          <div
                            key={table.id}
                            style={{
                              position: "absolute",
                              left: `${table.position.x}%`,
                              top: `${table.position.y}%`,
                              width: `${table.dimensions.width * 10}px`,
                              height: `${table.dimensions.length * 10}px`,
                            }}
                            className={`border-2 rounded ${
                              table.status === "Available"
                                ? "border-green-500 bg-green-100"
                                : table.status === "In Use"
                                ? "border-blue-500 bg-blue-100"
                                : "border-yellow-500 bg-yellow-100"
                            }`}
                            data-oid="tn-6:hl"
                          />
                        ))}
                      </div>
                    </div>
                    <div
                      className="grid grid-cols-1 gap-6 md:grid-cols-3"
                      data-oid="eaz::7d"
                    >
                      {tables.map((table) => (
                        <div
                          key={table.id}
                          className="p-4 transition-all duration-300 transform bg-gray-900 border rounded-lg border-red-900/20 hover:shadow-lg hover:border-red-500/30 hover:-translate-y-1"
                          data-oid="i_2__ry"
                        >
                          <div
                            className="flex items-start justify-between mb-4"
                            data-oid="vr5fldg"
                          >
                            <h3
                              className="font-semibold text-white"
                              data-oid="8c59bh0"
                            >
                              {table.name}
                            </h3>
                            <span
                              className={`px-2 py-1 rounded-full text-xs ${
                                table.status === "Available"
                                  ? "bg-green-100 text-green-800"
                                  : table.status === "In Use"
                                  ? "bg-blue-100 text-blue-800"
                                  : "bg-yellow-100 text-yellow-800"
                              }`}
                              data-oid="t_bxfak"
                            >
                              {table.status}
                            </span>
                          </div>
                          <p
                            className="mb-4 text-2xl font-bold text-red-500"
                            data-oid="b7_a5cr"
                          >
                            {table.price}
                          </p>
                          <div className="mb-4 space-y-2" data-oid="isr99qi">
                            <div
                              className="flex items-center justify-between"
                              data-oid="20xspsn"
                            >
                              <span
                                className="text-sm text-gray-400"
                                data-oid="y8eqy6a"
                              >
                                Condition:
                              </span>
                              <div
                                className="flex items-center"
                                data-oid="7iyeode"
                              >
                                <div
                                  className="w-24 h-2 overflow-hidden bg-gray-200 rounded-full"
                                  data-oid="2egrv:8"
                                >
                                  <div
                                    className="h-full bg-red-500"
                                    style={{
                                      width: `${(table.condition / 10) * 100}%`,
                                    }}
                                    data-oid=".e3i2.u"
                                  />
                                </div>
                                <span
                                  className="ml-2 text-sm font-medium"
                                  data-oid="89wv1ts"
                                >
                                  {table.condition}/10
                                </span>
                              </div>
                            </div>
                            <div
                              className="text-sm text-gray-600"
                              data-oid="ul3jo7h"
                            >
                              Last Maintenance: {table.lastMaintenance}
                            </div>
                          </div>
                          <div
                            className="flex justify-between mb-4 text-sm text-gray-500"
                            data-oid="nzwso3r"
                          >
                            <span data-oid="amaqryx">❤️ {table.likes}</span>
                            <span data-oid="g2h:fly">👁️ {table.views}</span>
                          </div>
                          <div className="flex space-x-2" data-oid=":2509co">
                            <button
                              onClick={() => handleTableAction(table)}
                              className="w-full px-3 py-2 text-sm text-white transition-colors bg-red-600 rounded-lg hover:bg-red-700"
                              data-oid="ibh0oer"
                            >
                              Manage
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === "team" && (
              <div className="space-y-6" data-oid="u195.:c">
                <div
                  className="flex items-center justify-between"
                  data-oid="m476_1_"
                >
                  <h2
                    className="mb-6 text-xl font-bold text-white"
                    data-oid="rm4nv91"
                  >
                    Team Members
                  </h2>
                  <button
                    className="px-4 py-2 text-white bg-red-600 rounded-lg hover:bg-red-700"
                    data-oid="c5mr2tf"
                  >
                    Add Team Member
                  </button>
                </div>
                <div
                  className="grid grid-cols-1 gap-6 md:grid-cols-3"
                  data-oid="8wtixf8"
                >
                  {team.map((member, index) => (
                    <div
                      key={index}
                      className="p-6 text-center transition-colors bg-gray-900 border rounded-lg border-red-900/20 hover:border-red-500/50"
                      data-oid="s9wzlv8"
                    >
                      <div className="mb-4 text-4xl" data-oid="tl:55dt">
                        {member.avatar}
                      </div>
                      <h3
                        className="mb-2 font-semibold text-white"
                        data-oid="ouu0ii_"
                      >
                        {member.name}
                      </h3>
                      <p
                        className="mb-4 text-sm text-gray-400"
                        data-oid="x2pjy9l"
                      >
                        {member.role}
                      </p>
                      <div
                        className="flex justify-center space-x-2"
                        data-oid="9um5zla"
                      >
                        <button
                          className="px-3 py-1 text-red-500 hover:text-red-400"
                          data-oid="ruyz_20"
                        >
                          Edit
                        </button>
                        <button
                          className="px-3 py-1 text-gray-400 hover:text-gray-300"
                          data-oid="3d8atq5"
                        >
                          View Schedule
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === "messages" && (
              <div className="space-y-4" data-oid="ajhqp1z">
                <div
                  className="flex items-center justify-between mb-6"
                  data-oid="yzh_7_w"
                >
                  <h2
                    className="text-xl font-bold text-white"
                    data-oid="sadxaab"
                  >
                    Messages
                  </h2>
                  <button
                    className="px-4 py-2 text-white bg-red-600 rounded-lg hover:bg-red-700"
                    data-oid="fnm:f4a"
                  >
                    New Message
                  </button>
                </div>
                <div className="flex gap-4" data-oid="kbktono">
                  <div
                    className="w-1/3 p-4 bg-gray-900 border rounded-lg border-red-900/20"
                    data-oid="20r.vns"
                  >
                    <div className="mb-4" data-oid="d_s6wuc">
                      <input
                        type="text"
                        placeholder="Search messages..."
                        className="w-full px-4 py-2 text-white placeholder-gray-500 bg-gray-800 border rounded-lg border-red-900/20"
                        data-oid="ur7t9wj"
                      />
                    </div>
                    <div className="space-y-2" data-oid="n7lip30">
                      {messages.map((message, index) => (
                        <div
                          key={index}
                          className={`p-3 rounded-lg cursor-pointer ${
                            message.status === "unread"
                              ? "bg-gray-800"
                              : "hover:bg-gray-800"
                          }`}
                          data-oid="_.x42f4"
                        >
                          <div
                            className="flex items-start justify-between"
                            data-oid="yzl8j1w"
                          >
                            <h3
                              className="font-semibold text-white"
                              data-oid="fc96gnc"
                            >
                              {message.from}
                            </h3>
                            <span
                              className="text-xs text-gray-400"
                              data-oid="1t5xd.."
                            >
                              {message.time}
                            </span>
                          </div>
                          <p
                            className="text-sm text-gray-400 truncate"
                            data-oid="4yvrovg"
                          >
                            {message.subject}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div
                    className="w-2/3 p-6 bg-gray-900 border rounded-lg border-red-900/20"
                    data-oid="0bopr3o"
                  >
                    <div
                      className="text-center text-gray-400"
                      data-oid="vcor-_t"
                    >
                      <p data-oid="821xip7">Select a message to view details</p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === "analytics" && (
              <div className="space-y-6" data-oid="h.p5m61">
                <div
                  className="flex items-center justify-between"
                  data-oid="crwfkco"
                >
                  <h2
                    className="text-xl font-bold text-white"
                    data-oid="tn7ggfy"
                  >
                    Analytics
                  </h2>
                  <div className="flex space-x-4" data-oid="_4449xd">
                    <select
                      className="px-4 py-2 text-white bg-gray-900 border rounded-lg border-red-900/20"
                      data-oid="9qkhc4g"
                    >
                      <option data-oid="sr77s2f">Last 7 days</option>
                      <option data-oid="7ynpnk:">Last 30 days</option>
                      <option data-oid="0sdig6y">Last 90 days</option>
                    </select>
                    <button
                      className="px-4 py-2 text-white bg-red-600 rounded-lg hover:bg-red-700"
                      data-oid="zrqtjv6"
                    >
                      Export Report
                    </button>
                  </div>
                </div>
                <div
                  className="grid grid-cols-1 gap-6 md:grid-cols-2"
                  data-oid="_k56d66"
                >
                  <div
                    className="p-6 bg-gray-900 border rounded-lg border-red-900/20"
                    data-oid="6j-htbp"
                  >
                    <h3
                      className="mb-4 text-lg font-semibold text-white"
                      data-oid="q97t5su"
                    >
                      Revenue Overview
                    </h3>
                    <div
                      className="flex items-center justify-center h-64 bg-gray-800 rounded-lg"
                      data-oid=":r1:y4x"
                    >
                      <p className="text-gray-400" data-oid="nt_5-yd">
                        Revenue Chart Coming Soon
                      </p>
                    </div>
                  </div>
                  <div
                    className="p-6 bg-gray-900 border rounded-lg border-red-900/20"
                    data-oid="o9ozvsw"
                  >
                    <h3
                      className="mb-4 text-lg font-semibold text-white"
                      data-oid="msrknu:"
                    >
                      Table Usage
                    </h3>
                    <div
                      className="flex items-center justify-center h-64 bg-gray-800 rounded-lg"
                      data-oid="1zp38rq"
                    >
                      <p className="text-gray-400" data-oid=":3_k1qk">
                        Usage Chart Coming Soon
                      </p>
                    </div>
                  </div>
                  <div
                    className="p-6 bg-gray-900 border rounded-lg border-red-900/20"
                    data-oid="1:eh0ea"
                  >
                    <h3
                      className="mb-4 text-lg font-semibold text-white"
                      data-oid="d4c_-5i"
                    >
                      Popular Hours
                    </h3>
                    <div
                      className="flex items-center justify-center h-64 bg-gray-800 rounded-lg"
                      data-oid="je:uvcd"
                    >
                      <p className="text-gray-400" data-oid="9ddlk_r">
                        Hours Chart Coming Soon
                      </p>
                    </div>
                  </div>
                  <div
                    className="p-6 bg-gray-900 border rounded-lg border-red-900/20"
                    data-oid="-96qzre"
                  >
                    <h3
                      className="mb-4 text-lg font-semibold text-white"
                      data-oid="erk17v3"
                    >
                      Maintenance Costs
                    </h3>
                    <div
                      className="flex items-center justify-center h-64 bg-gray-800 rounded-lg"
                      data-oid=".afxcbz"
                    >
                      <p className="text-gray-400" data-oid="46sle84">
                        Cost Chart Coming Soon
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </main>

        {/* Table Management Modal */}
        {isModalOpen && selectedTable && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50"
            data-oid="nfvgt76"
          >
            <div
              className="bg-white rounded-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto"
              data-oid="zmn.r3v"
            >
              <div className="p-6" data-oid="wx9q1n7">
                <div
                  className="flex items-center justify-between mb-6"
                  data-oid=".3j4v:h"
                >
                  <h2
                    className="text-xl font-bold text-gray-900"
                    data-oid="2_9-8y."
                  >
                    {selectedTable.name}
                  </h2>
                  <button
                    onClick={() => setIsModalOpen(false)}
                    className="text-gray-500 hover:text-gray-700"
                    data-oid="kpb9p0u"
                  >
                    ✕
                  </button>
                </div>

                <div
                  className="grid grid-cols-1 gap-6 md:grid-cols-2"
                  data-oid="qcapjqw"
                >
                  {/* Table Details */}
                  <div className="space-y-4" data-oid="2vbhsii">
                    <div className="grid grid-cols-2 gap-4" data-oid="8t.1saq">
                      <div data-oid="flmhi2p">
                        <label
                          className="block mb-1 text-sm font-medium text-gray-700"
                          data-oid="j4m183c"
                        >
                          Status
                        </label>
                        <select
                          className="w-full p-2 border rounded-lg"
                          value={selectedTable.status}
                          onChange={(e) => {
                            setTables(
                              tables.map((t) =>
                                t.id === selectedTable.id
                                  ? {
                                      ...t,
                                      status: e.target.value as
                                        | "Available"
                                        | "In Use"
                                        | "Maintenance",
                                    }
                                  : t
                              )
                            );
                          }}
                          data-oid="1r7i5rm"
                        >
                          <option value="Available" data-oid="-9_gz1q">
                            Available
                          </option>
                          <option value="In Use" data-oid="tb9ewzx">
                            In Use
                          </option>
                          <option value="Maintenance" data-oid="x6sil9m">
                            Maintenance
                          </option>
                        </select>
                      </div>
                      <div data-oid="5kf6ev9">
                        <label
                          className="block mb-1 text-sm font-medium text-gray-700"
                          data-oid=":c16_ep"
                        >
                          Condition Score
                        </label>
                        <input
                          type="number"
                          min="0"
                          max="10"
                          step="0.1"
                          value={selectedTable.condition}
                          onChange={(e) => {
                            setTables(
                              tables.map((t) =>
                                t.id === selectedTable.id
                                  ? {
                                      ...t,
                                      condition: parseFloat(e.target.value),
                                    }
                                  : t
                              )
                            );
                          }}
                          className="w-full p-2 border rounded-lg"
                          data-oid="xyv8kqr"
                        />
                      </div>
                    </div>

                    {/* Position on Floor Plan */}
                    <div data-oid="h455y6y">
                      <h3
                        className="mb-2 font-medium text-gray-900"
                        data-oid="zbs:1ct"
                      >
                        Position on Floor Plan
                      </h3>
                      <div
                        className="grid grid-cols-2 gap-4"
                        data-oid="h5bke-v"
                      >
                        <div data-oid="fmc1t:w">
                          <label
                            className="block mb-1 text-sm text-gray-600"
                            data-oid=".ygztgh"
                          >
                            X Position (%)
                          </label>
                          <input
                            type="number"
                            value={selectedTable.position.x}
                            onChange={(e) => {
                              setTables(
                                tables.map((t) =>
                                  t.id === selectedTable.id
                                    ? {
                                        ...t,
                                        position: {
                                          ...t.position,
                                          x: parseInt(e.target.value),
                                        },
                                      }
                                    : t
                                )
                              );
                            }}
                            className="w-full p-2 border rounded-lg"
                            data-oid="77g_gyi"
                          />
                        </div>
                        <div data-oid="d1-w_2w">
                          <label
                            className="block mb-1 text-sm text-gray-600"
                            data-oid="yvvore2"
                          >
                            Y Position (%)
                          </label>
                          <input
                            type="number"
                            value={selectedTable.position.y}
                            onChange={(e) => {
                              setTables(
                                tables.map((t) =>
                                  t.id === selectedTable.id
                                    ? {
                                        ...t,
                                        position: {
                                          ...t.position,
                                          y: parseInt(e.target.value),
                                        },
                                      }
                                    : t
                                )
                              );
                            }}
                            className="w-full p-2 border rounded-lg"
                            data-oid=":4fop81"
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Maintenance History */}
                  <div className="space-y-4" data-oid="amvm:4m">
                    <div data-oid="61m0k7:">
                      <h3
                        className="mb-2 font-medium text-gray-900"
                        data-oid="n.08d-4"
                      >
                        Maintenance History
                      </h3>
                      <div
                        className="overflow-y-auto border divide-y rounded-lg max-h-48"
                        data-oid="wig__f6"
                      >
                        {selectedTable.maintenanceHistory.map(
                          (record, index) => (
                            <div key={index} className="p-3" data-oid="u-2688q">
                              <div
                                className="flex justify-between text-sm"
                                data-oid="ucmr1tv"
                              >
                                <span
                                  className="font-medium"
                                  data-oid="cnrv0z."
                                >
                                  {record.date}
                                </span>
                                <span
                                  className="text-indigo-600"
                                  data-oid="yz4.w4t"
                                >
                                  ${record.cost}
                                </span>
                              </div>
                              <p
                                className="mt-1 text-sm text-gray-600"
                                data-oid="rrdgf0t"
                              >
                                {record.description}
                              </p>
                              <span
                                className="inline-block px-2 py-1 mt-1 text-xs text-gray-700 bg-gray-100 rounded"
                                data-oid="gqq-1.q"
                              >
                                {record.type}
                              </span>
                            </div>
                          )
                        )}
                      </div>
                    </div>

                    {/* Rental History */}
                    <div data-oid="_el9j59">
                      <h3
                        className="mb-2 font-medium text-gray-900"
                        data-oid="shztdsd"
                      >
                        Rental History
                      </h3>
                      <div
                        className="overflow-y-auto border divide-y rounded-lg max-h-48"
                        data-oid="scys81f"
                      >
                        {selectedTable.rentalHistory.map((rental, index) => (
                          <div key={index} className="p-3" data-oid="e_o5vk0">
                            <div
                              className="flex justify-between text-sm"
                              data-oid="1ppku0r"
                            >
                              <span className="font-medium" data-oid="onxpn05">
                                {rental.customerName}
                              </span>
                              <span
                                className="text-green-600"
                                data-oid="lgctj3l"
                              >
                                ${rental.revenue}
                              </span>
                            </div>
                            <p
                              className="mt-1 text-sm text-gray-600"
                              data-oid="jzik_bb"
                            >
                              {new Date(rental.startTime).toLocaleString()} -{" "}
                              {new Date(rental.endTime).toLocaleString()}
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div
                  className="flex justify-end mt-6 space-x-3"
                  data-oid="3_iuf5m"
                >
                  <button
                    onClick={() => setIsModalOpen(false)}
                    className="px-4 py-2 text-gray-600 border rounded-lg hover:bg-gray-50"
                    data-oid="_v1tupb"
                  >
                    Close
                  </button>
                  <button
                    className="px-4 py-2 text-white bg-indigo-500 rounded-lg hover:bg-indigo-600"
                    data-oid="8sznua3"
                  >
                    Save Changes
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
