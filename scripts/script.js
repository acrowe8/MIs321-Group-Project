// Sample data storage (in a real app, this would be a database)
let userRatings = {}; // Store user ratings separately

let notesData = [
    // MIS 221 - Jeff Lucas (Business Programming 1 - C#)
    {
        id: 1,
        title: "C# Programming Fundamentals",
        class: "MIS 221",
        topic: "Lecture Notes",
        author: "Sarah Johnson",
        teacher: "Jeff Lucas",
        content: "Professor Lucas covered C# fundamentals today. Started with variables - int, string, bool, double. Showed us how to declare variables with proper naming conventions (camelCase). Went through if/else statements and switch cases. Demonstrated for loops, while loops, and foreach loops with examples. Explained method creation with parameters and return types. Covered basic class structure with properties and methods. Showed inheritance with base and derived classes. Exception handling with try-catch blocks. File operations for reading/writing text files. Homework: Create a simple calculator program using all concepts covered.",
        rating: 4.5,
        date: "2024-09-15"
    },
    {
        id: 2,
        title: "Object-Oriented Programming in C#",
        class: "MIS 221",
        topic: "Study Guide",
        author: "Mike Davis",
        teacher: "Jeff Lucas",
        content: "Today's lecture focused on Object-Oriented Programming in C#. Professor Lucas explained encapsulation using properties with get/set accessors. Showed inheritance with examples of base class 'Vehicle' and derived class 'Car'. Demonstrated polymorphism with method overriding using virtual/override keywords. Covered abstract classes and interfaces - when to use each. Explained constructors (default and parameterized) and destructors. Went through access modifiers: public, private, protected, internal. Method overloading with different parameter types. Lab exercise: Create a banking system with Account base class and Checking/Savings derived classes. Due next Tuesday.",
        rating: 4.2,
        date: "2024-09-14"
    },
    {
        id: 3,
        title: "C# Collections and LINQ",
        class: "MIS 221",
        topic: "Lecture Notes",
        author: "Emily Chen",
        teacher: "Jeff Lucas",
        content: "Professor Lucas covered C# Collections and LINQ today. Started with arrays vs Lists - when to use each. Showed Dictionary<TKey, TValue> for key-value pairs. Demonstrated Hashtable for older code. LINQ queries using from/where/select syntax. Lambda expressions with => operator. Anonymous types using var keyword. Extension methods to add functionality to existing classes. Query optimization tips - avoid N+1 problems. Practical example: Student grade management system using List<Student> and LINQ to calculate averages. Assignment: Build a library management system using collections and LINQ. Midterm next week covers chapters 1-5.",
        rating: 4.8,
        date: "2024-09-13"
    },
    {
        id: 4,
        title: "C# Data Structures",
        class: "MIS 221",
        topic: "Project Guidelines",
        author: "Alex Rodriguez",
        teacher: "Jeff Lucas",
        content: "Today's lab covered C# Data Structures. Professor Lucas explained when to use Stack<T> (LIFO) vs Queue<T> (FIFO). Demonstrated LinkedList<T> for dynamic sizing. HashTable vs Dictionary performance differences. Binary trees and graph traversal algorithms. Generic collections with type parameters. Performance considerations - Big O notation for different operations. Lab exercise: Implement a calculator using Stack for postfix notation. Showed how to create custom generic classes. Assignment: Build a simple social network using graph data structure. Office hours: Tuesday 2-4pm in Shelby 2001.",
        rating: 4.3,
        date: "2024-09-12"
    },
    {
        id: 5,
        title: "C# Exception Handling",
        class: "MIS 221",
        topic: "Lecture Notes",
        author: "Jordan Smith",
        teacher: "Jeff Lucas",
        content: "Professor Lucas covered Exception Handling in C# today. Started with try-catch blocks and different exception types (ArgumentException, NullReferenceException, etc.). Showed how to create custom exceptions by inheriting from Exception class. Finally blocks for cleanup code. Using statements for automatic disposal. Exception propagation up the call stack. Best practices: catch specific exceptions, don't catch all exceptions, log errors properly. Demonstrated with file I/O examples. Lab: Add exception handling to previous calculator assignment. Quiz next class on exception handling. Remember to bring laptops for hands-on coding.",
        rating: 4.6,
        date: "2024-09-11"
    },
    {
        id: 6,
        title: "User Interface Design",
        class: "MIS 221",
        topic: "Study Guide",
        author: "Taylor Wilson",
        teacher: "Jeff Lucas",
        content: "UI/UX design principles: 1. User-centered design 2. Usability testing 3. Accessibility guidelines 4. Responsive design 5. Wireframing 6. Prototyping 7. Design systems",
        rating: 4.4,
        date: "2024-09-10"
    },
    {
        id: 7,
        title: "System Testing Strategies",
        class: "MIS 221",
        topic: "Exam Review",
        author: "Chris Brown",
        teacher: "Jeff Lucas",
        content: "Testing methodologies: 1. Unit testing 2. Integration testing 3. System testing 4. User acceptance testing 5. Performance testing 6. Security testing 7. Regression testing",
        rating: 4.7,
        date: "2024-09-09"
    },
    {
        id: 8,
        title: "Project Management for IT",
        class: "MIS 221",
        topic: "Lecture Notes",
        author: "Morgan Lee",
        teacher: "Jeff Lucas",
        content: "IT project management: 1. Project planning 2. Risk management 3. Resource allocation 4. Timeline management 5. Quality assurance 6. Communication planning 7. Stakeholder management",
        rating: 4.1,
        date: "2024-09-08"
    },
    {
        id: 9,
        title: "System Implementation",
        class: "MIS 221",
        topic: "Project Guidelines",
        author: "Casey White",
        teacher: "Jeff Lucas",
        content: "Implementation strategies: 1. Phased implementation 2. Parallel implementation 3. Pilot implementation 4. Big bang implementation 5. Change management 6. Training programs 7. Go-live planning",
        rating: 4.5,
        date: "2024-09-07"
    },
    {
        id: 10,
        title: "System Maintenance",
        class: "MIS 221",
        topic: "Lecture Notes",
        author: "Riley Green",
        teacher: "Jeff Lucas",
        content: "System maintenance activities: 1. Preventive maintenance 2. Corrective maintenance 3. Adaptive maintenance 4. Perfective maintenance 5. Documentation updates 6. Performance monitoring 7. Security updates",
        rating: 4.2,
        date: "2024-09-06"
    },

    // MIS 321 - Jeff Lucas (Business Programming 2 - HTML, CSS, JavaScript)
    {
        id: 11,
        title: "HTML5 Fundamentals",
        class: "MIS 321",
        topic: "Lecture Notes",
        author: "Sarah Johnson",
        teacher: "Jeff Lucas",
        content: "Professor Lucas started HTML5 fundamentals today. Covered document structure with DOCTYPE html, head, and body tags. Explained semantic elements like header, nav, main, article, section, aside, footer. Showed new input types: email, tel, url, date, number, range. Demonstrated video and audio elements with controls. Canvas element for drawing graphics. SVG for scalable vector graphics. Local storage vs session storage. Accessibility features with ARIA labels and alt attributes. Lab: Create a personal portfolio website using semantic HTML5. Assignment due Friday. Office hours: Wednesday 1-3pm.",
        rating: 4.5,
        date: "2024-09-15"
    },
    {
        id: 12,
        title: "CSS3 Styling and Layout",
        class: "MIS 321",
        topic: "Study Guide",
        author: "Mike Davis",
        teacher: "Jeff Lucas",
        content: "Today's lecture covered CSS3 Styling and Layout. Professor Lucas demonstrated Flexbox with justify-content, align-items, flex-direction properties. CSS Grid with grid-template-columns and grid-gap. Animations using @keyframes and animation property. Transitions for smooth hover effects. Transforms for rotate, scale, translate. Media queries for responsive design (@media screen and (max-width: 768px)). CSS custom properties (variables) with :root selector. Mobile-first approach to responsive design. Lab: Style the portfolio website with CSS3 features. Remember to test on different screen sizes. Quiz next week on CSS selectors and properties.",
        rating: 4.8,
        date: "2024-09-14"
    },
    {
        id: 13,
        title: "JavaScript Fundamentals",
        class: "MIS 321",
        topic: "Lecture Notes",
        author: "Emily Chen",
        teacher: "Jeff Lucas",
        content: "JavaScript basics: 1. Variables and data types 2. Functions and scope 3. DOM manipulation 4. Event handling 5. AJAX and fetch 6. JSON processing 7. ES6+ features",
        rating: 4.6,
        date: "2024-09-13"
    },
    {
        id: 14,
        title: "Responsive Web Design",
        class: "MIS 321",
        topic: "Lecture Notes",
        author: "Alex Rodriguez",
        teacher: "Jeff Lucas",
        content: "Responsive design: 1. Mobile-first approach 2. Flexible grids 3. Media queries 4. Responsive images 5. Touch-friendly interfaces 6. Cross-browser compatibility 7. Performance optimization",
        rating: 4.3,
        date: "2024-09-12"
    },
    {
        id: 15,
        title: "Data Warehousing",
        class: "MIS 321",
        topic: "Project Guidelines",
        author: "Jordan Smith",
        teacher: "Jeff Lucas",
        content: "Data warehouse concepts: 1. ETL processes 2. Star schema design 3. Snowflake schema 4. OLAP vs OLTP 5. Data marts 6. Data quality management 7. Business intelligence tools",
        rating: 4.4,
        date: "2024-09-11"
    },
    {
        id: 16,
        title: "Database Security",
        class: "MIS 321",
        topic: "Lecture Notes",
        author: "Taylor Wilson",
        teacher: "Jeff Lucas",
        content: "Database security measures: 1. Authentication and authorization 2. Encryption at rest and in transit 3. Access control 4. Audit logging 5. SQL injection prevention 6. Data masking 7. Compliance requirements",
        rating: 4.7,
        date: "2024-09-10"
    },
    {
        id: 17,
        title: "Transaction Management",
        class: "MIS 321",
        topic: "Study Guide",
        author: "Chris Brown",
        teacher: "Jeff Lucas",
        content: "Transaction concepts: 1. ACID properties 2. Concurrency control 3. Locking mechanisms 4. Deadlock prevention 5. Isolation levels 6. Two-phase commit 7. Distributed transactions",
        rating: 4.5,
        date: "2024-09-09"
    },
    {
        id: 18,
        title: "Database Performance Tuning",
        class: "MIS 321",
        topic: "Lecture Notes",
        author: "Morgan Lee",
        teacher: "Jeff Lucas",
        content: "Performance optimization: 1. Query analysis 2. Index optimization 3. Statistics collection 4. Partitioning strategies 5. Memory management 6. I/O optimization 7. Monitoring tools",
        rating: 4.6,
        date: "2024-09-08"
    },
    {
        id: 19,
        title: "Big Data Technologies",
        class: "MIS 321",
        topic: "Project Guidelines",
        author: "Casey White",
        teacher: "Jeff Lucas",
        content: "Big data ecosystem: 1. Hadoop framework 2. MapReduce programming 3. HDFS architecture 4. Spark processing 5. NoSQL databases 6. Data lakes 7. Real-time processing",
        rating: 4.2,
        date: "2024-09-07"
    },
    {
        id: 20,
        title: "Database Design Patterns",
        class: "MIS 321",
        topic: "Lecture Notes",
        author: "Riley Green",
        teacher: "Jeff Lucas",
        content: "Design patterns: 1. Repository pattern 2. Unit of work 3. Factory pattern 4. Singleton pattern 5. Observer pattern 6. Strategy pattern 7. Command pattern",
        rating: 4.4,
        date: "2024-09-06"
    },

    // MIS 330 - Yuanyuan Chen (Database - SQL and ERD Diagrams)
    {
        id: 21,
        title: "Database Design Fundamentals",
        class: "MIS 330",
        topic: "Lecture Notes",
        author: "Emily Chen",
        teacher: "Yuanyuan Chen",
        content: "Professor Chen covered Database Design Fundamentals today. Started with Entity-Relationship modeling - entities, attributes, relationships. Showed how to identify primary keys and foreign keys. Explained referential integrity and cascade options. Database constraints: NOT NULL, UNIQUE, CHECK, DEFAULT. Indexing strategies for performance. Data modeling best practices - avoid redundancy, maintain consistency. Used example of university database with Students, Courses, Enrollments. Lab: Design ERD for library management system. Assignment: Create normalized database schema. Midterm covers chapters 1-4. Office hours: Monday 10am-12pm in Shelby 2003.",
        rating: 4.0,
        date: "2024-09-08"
    },
    {
        id: 22,
        title: "SQL Query Fundamentals",
        class: "MIS 330",
        topic: "Lecture Notes",
        author: "Alex Rodriguez",
        teacher: "Yuanyuan Chen",
        content: "Professor Chen taught SQL Query Fundamentals today. Started with basic SELECT statements and WHERE clauses. Demonstrated different JOIN types: INNER, LEFT, RIGHT, FULL OUTER. Showed GROUP BY with aggregate functions (COUNT, SUM, AVG, MAX, MIN). HAVING clause for filtering grouped results. ORDER BY for sorting results. Subqueries and Common Table Expressions (CTEs). Used Northwind database for examples. Lab: Write queries to find top customers, product sales by category. Assignment: Create 10 complex queries with joins and subqueries. Quiz next class on SELECT statements. Bring laptops for hands-on SQL practice.",
        rating: 4.7,
        date: "2024-09-15"
    },
    {
        id: 23,
        title: "ERD Diagram Design",
        class: "MIS 330",
        topic: "Study Guide",
        author: "Jordan Smith",
        teacher: "Yuanyuan Chen",
        content: "ERD concepts: 1. Entity identification 2. Attribute definition 3. Relationship modeling 4. Cardinality constraints 5. Weak entities 6. Supertype/subtype 7. Diagram notation",
        rating: 4.5,
        date: "2024-09-14"
    },
    {
        id: 24,
        title: "Database Normalization",
        class: "MIS 330",
        topic: "Lecture Notes",
        author: "Taylor Wilson",
        teacher: "Yuanyuan Chen",
        content: "Normalization process: 1. First Normal Form (1NF) 2. Second Normal Form (2NF) 3. Third Normal Form (3NF) 4. BCNF 5. Functional dependencies 6. Anomaly elimination 7. Denormalization considerations",
        rating: 4.3,
        date: "2024-09-13"
    },
    {
        id: 25,
        title: "Node.js Backend Development",
        class: "MIS 330",
        topic: "Project Guidelines",
        author: "Chris Brown",
        teacher: "Yuanyuan Chen",
        content: "Backend development: 1. Express.js framework 2. RESTful API design 3. Middleware concepts 4. Database integration 5. Authentication 6. Error handling 7. Testing strategies",
        rating: 4.6,
        date: "2024-09-12"
    },
    {
        id: 26,
        title: "Database Integration",
        class: "MIS 330",
        topic: "Lecture Notes",
        author: "Morgan Lee",
        teacher: "Yuanyuan Chen",
        content: "Database connectivity: 1. SQL vs NoSQL 2. ORM frameworks 3. Connection pooling 4. Query optimization 5. Data validation 6. Migration strategies 7. Performance monitoring",
        rating: 4.4,
        date: "2024-09-11"
    },
    {
        id: 27,
        title: "Web Security Fundamentals",
        class: "MIS 330",
        topic: "Study Guide",
        author: "Casey White",
        teacher: "Yuanyuan Chen",
        content: "Security best practices: 1. HTTPS implementation 2. Input validation 3. SQL injection prevention 4. XSS protection 5. CSRF tokens 6. Authentication security 7. Data encryption",
        rating: 4.8,
        date: "2024-09-10"
    },
    {
        id: 28,
        title: "API Development",
        class: "MIS 330",
        topic: "Lecture Notes",
        author: "Riley Green",
        teacher: "Yuanyuan Chen",
        content: "API design principles: 1. RESTful architecture 2. HTTP methods 3. Status codes 4. API documentation 5. Versioning strategies 6. Rate limiting 7. Error responses",
        rating: 4.5,
        date: "2024-09-09"
    },
    {
        id: 29,
        title: "Frontend Build Tools",
        class: "MIS 330",
        topic: "Project Guidelines",
        author: "Sam Taylor",
        teacher: "Yuanyuan Chen",
        content: "Build automation: 1. Webpack configuration 2. Babel transpilation 3. CSS preprocessing 4. Asset optimization 5. Development servers 6. Hot reloading 7. Production builds",
        rating: 4.2,
        date: "2024-09-07"
    },
    {
        id: 30,
        title: "Web Performance Optimization",
        class: "MIS 330",
        topic: "Lecture Notes",
        author: "Jamie Kim",
        teacher: "Yuanyuan Chen",
        content: "Performance techniques: 1. Image optimization 2. Code splitting 3. Lazy loading 4. Caching strategies 5. CDN usage 6. Minification 7. Performance monitoring",
        rating: 4.6,
        date: "2024-09-06"
    },

    // MIS 405 - Dr. Smith (10 notes)
    {
        id: 31,
        title: "Cybersecurity Fundamentals",
        class: "MIS 405",
        topic: "Lecture Notes",
        author: "Jordan Smith",
        teacher: "Dr. Smith",
        content: "Dr. Smith covered Cybersecurity Fundamentals today. Started with the CIA triad - Confidentiality, Integrity, Availability. Explained common attack vectors: phishing, malware, DDoS, SQL injection. Network security protocols like SSL/TLS, VPN, firewalls. Encryption methods: symmetric vs asymmetric, RSA, AES. Access control models: RBAC, ABAC. Authentication factors: something you know, have, are. Incident response lifecycle: preparation, detection, containment, eradication, recovery. Risk assessment matrix with likelihood and impact. Lab: Set up firewall rules and analyze network traffic. Assignment: Create security policy for small business. Midterm covers chapters 1-6. Office hours: Thursday 2-4pm in Shelby 2005.",
        rating: 4.8,
        date: "2024-09-14"
    },
    {
        id: 32,
        title: "Network Security Protocols",
        class: "MIS 405",
        topic: "Study Guide",
        author: "Taylor Wilson",
        teacher: "Dr. Smith",
        content: "Dr. Smith taught Network Security Protocols today. Demonstrated SSL/TLS handshake process and certificate validation. VPN technologies: IPSec, OpenVPN, site-to-site vs remote access. Firewall configurations: packet filtering, stateful inspection, application-layer filtering. Intrusion Detection Systems (IDS) vs Intrusion Prevention Systems (IPS). Network monitoring tools: Wireshark, tcpdump, netstat. Wireless security: WPA3, enterprise authentication, rogue AP detection. Email security: SPF, DKIM, DMARC records. Lab: Configure firewall rules and analyze network traffic. Assignment: Design secure network architecture for university. Quiz next week on network protocols. Bring laptops for hands-on lab exercises.",
        rating: 4.5,
        date: "2024-09-13"
    },
    {
        id: 33,
        title: "Cryptography Principles",
        class: "MIS 405",
        topic: "Lecture Notes",
        author: "Chris Brown",
        teacher: "Dr. Smith",
        content: "Cryptographic concepts: 1. Symmetric encryption 2. Asymmetric encryption 3. Hash functions 4. Digital signatures 5. Public key infrastructure 6. Certificate management 7. Quantum cryptography",
        rating: 4.7,
        date: "2024-09-12"
    },
    {
        id: 34,
        title: "Security Risk Assessment",
        class: "MIS 405",
        topic: "Project Guidelines",
        author: "Morgan Lee",
        teacher: "Dr. Smith",
        content: "Risk management: 1. Threat modeling 2. Vulnerability assessment 3. Risk quantification 4. Security controls 5. Compliance frameworks 6. Security policies 7. Incident response planning",
        rating: 4.4,
        date: "2024-09-11"
    },
    {
        id: 35,
        title: "Penetration Testing",
        class: "MIS 405",
        topic: "Lecture Notes",
        author: "Casey White",
        teacher: "Dr. Smith",
        content: "Penetration testing methodology: 1. Reconnaissance 2. Scanning and enumeration 3. Vulnerability assessment 4. Exploitation techniques 5. Post-exploitation 6. Reporting 7. Remediation",
        rating: 4.6,
        date: "2024-09-10"
    },
    {
        id: 36,
        title: "Security Compliance",
        class: "MIS 405",
        topic: "Study Guide",
        author: "Riley Green",
        teacher: "Dr. Smith",
        content: "Compliance frameworks: 1. GDPR requirements 2. HIPAA compliance 3. SOX regulations 4. PCI DSS standards 5. ISO 27001 6. NIST framework 7. Audit procedures",
        rating: 4.3,
        date: "2024-09-09"
    },
    {
        id: 37,
        title: "Identity and Access Management",
        class: "MIS 405",
        topic: "Lecture Notes",
        author: "Sam Taylor",
        teacher: "Dr. Smith",
        content: "IAM concepts: 1. Authentication methods 2. Authorization models 3. Single sign-on 4. Multi-factor authentication 5. Privileged access management 6. Identity governance 7. Zero trust architecture",
        rating: 4.5,
        date: "2024-09-08"
    },
    {
        id: 38,
        title: "Security Monitoring",
        class: "MIS 405",
        topic: "Project Guidelines",
        author: "Jamie Kim",
        teacher: "Dr. Smith",
        content: "Security monitoring: 1. SIEM systems 2. Log analysis 3. Threat detection 4. Security analytics 5. Incident correlation 6. Automated response 7. Security orchestration",
        rating: 4.7,
        date: "2024-09-07"
    },
    {
        id: 39,
        title: "Cloud Security",
        class: "MIS 405",
        topic: "Lecture Notes",
        author: "Alex Chen",
        teacher: "Dr. Smith",
        content: "Cloud security models: 1. Shared responsibility 2. Cloud access security brokers 3. Data encryption 4. Identity federation 5. Security monitoring 6. Compliance in cloud 7. Incident response",
        rating: 4.4,
        date: "2024-09-06"
    },
    {
        id: 40,
        title: "Security Architecture",
        class: "MIS 405",
        topic: "Study Guide",
        author: "Maria Garcia",
        teacher: "Dr. Smith",
        content: "Security architecture design: 1. Defense in depth 2. Security zones 3. Network segmentation 4. Security controls 5. Security patterns 6. Threat modeling 7. Security testing",
        rating: 4.6,
        date: "2024-09-05"
    },

    // MIS 430 - Prof. Johnson (10 notes)
    {
        id: 41,
        title: "Data Analytics with Python",
        class: "MIS 430",
        topic: "Study Guide",
        author: "Alex Rodriguez",
        teacher: "Prof. Johnson",
        content: "Prof. Johnson covered Data Analytics with Python today. Started with Pandas for data manipulation - DataFrames, Series, indexing. NumPy for numerical computing - arrays, broadcasting, linear algebra. Matplotlib and Seaborn for data visualization - line plots, histograms, scatter plots, heatmaps. Scikit-learn for machine learning algorithms - classification, regression, clustering. Jupyter notebooks for interactive development and documentation. Data cleaning techniques: handling missing values, outliers, duplicates. Statistical analysis: descriptive statistics, correlation, hypothesis testing. Lab: Analyze sales data using Python libraries. Assignment: Create comprehensive data analysis report. Midterm covers Python basics and data manipulation. Office hours: Tuesday 3-5pm in Shelby 2007.",
        rating: 4.2,
        date: "2024-09-12"
    },
    {
        id: 42,
        title: "Statistical Analysis Methods",
        class: "MIS 430",
        topic: "Lecture Notes",
        author: "Jordan Smith",
        teacher: "Prof. Johnson",
        content: "Prof. Johnson taught Statistical Analysis Methods today. Covered descriptive statistics: mean, median, mode, standard deviation, variance. Inferential statistics: confidence intervals, margin of error. Hypothesis testing: null vs alternative hypothesis, p-values, significance levels. Regression analysis: simple linear regression, multiple regression, R-squared. Correlation analysis: Pearson correlation coefficient, scatter plots. ANOVA: one-way and two-way analysis of variance. Time series analysis: trend, seasonality, forecasting. Used R and Python for statistical calculations. Lab: Perform statistical analysis on student grade data. Assignment: Conduct hypothesis test and write report. Quiz next class on probability distributions. Bring calculators for statistical calculations.",
        rating: 4.5,
        date: "2024-09-15"
    },
    {
        id: 43,
        title: "Data Visualization Techniques",
        class: "MIS 430",
        topic: "Project Guidelines",
        author: "Taylor Wilson",
        teacher: "Prof. Johnson",
        content: "Visualization best practices: 1. Chart selection 2. Color theory 3. Data storytelling 4. Interactive dashboards 5. Tableau fundamentals 6. Power BI basics 7. D3.js for custom visualizations",
        rating: 4.3,
        date: "2024-09-14"
    },
    {
        id: 44,
        title: "Machine Learning Fundamentals",
        class: "MIS 430",
        topic: "Lecture Notes",
        author: "Chris Brown",
        teacher: "Prof. Johnson",
        content: "ML concepts: 1. Supervised learning 2. Unsupervised learning 3. Feature engineering 4. Model evaluation 5. Cross-validation 6. Overfitting prevention 7. Model deployment",
        rating: 4.6,
        date: "2024-09-13"
    },
    {
        id: 45,
        title: "Big Data Analytics",
        class: "MIS 430",
        topic: "Study Guide",
        author: "Morgan Lee",
        teacher: "Prof. Johnson",
        content: "Big data processing: 1. Hadoop ecosystem 2. Spark analytics 3. Data lakes 4. Stream processing 5. Real-time analytics 6. Data pipeline design 7. Scalability considerations",
        rating: 4.4,
        date: "2024-09-11"
    },
    {
        id: 46,
        title: "Business Intelligence",
        class: "MIS 430",
        topic: "Lecture Notes",
        author: "Casey White",
        teacher: "Prof. Johnson",
        content: "BI concepts: 1. Data warehousing 2. ETL processes 3. OLAP cubes 4. Dashboard design 5. KPI development 6. Reporting automation 7. Data governance",
        rating: 4.7,
        date: "2024-09-10"
    },
    {
        id: 47,
        title: "Data Mining Techniques",
        class: "MIS 430",
        topic: "Project Guidelines",
        author: "Riley Green",
        teacher: "Prof. Johnson",
        content: "Data mining methods: 1. Association rules 2. Classification algorithms 3. Clustering techniques 4. Anomaly detection 5. Text mining 6. Web mining 7. Social network analysis",
        rating: 4.5,
        date: "2024-09-09"
    },
    {
        id: 48,
        title: "Predictive Analytics",
        class: "MIS 430",
        topic: "Lecture Notes",
        author: "Sam Taylor",
        teacher: "Prof. Johnson",
        content: "Predictive modeling: 1. Regression models 2. Time series forecasting 3. Decision trees 4. Neural networks 5. Ensemble methods 6. Model validation 7. Business applications",
        rating: 4.6,
        date: "2024-09-08"
    },
    {
        id: 49,
        title: "Data Quality Management",
        class: "MIS 430",
        topic: "Study Guide",
        author: "Jamie Kim",
        teacher: "Prof. Johnson",
        content: "Data quality: 1. Data profiling 2. Data cleansing 3. Data validation 4. Data standardization 5. Duplicate detection 6. Data lineage 7. Quality metrics",
        rating: 4.3,
        date: "2024-09-07"
    },
    {
        id: 50,
        title: "Analytics Project Management",
        class: "MIS 430",
        topic: "Project Guidelines",
        author: "Alex Chen",
        teacher: "Prof. Johnson",
        content: "Project management: 1. Project planning 2. Stakeholder management 3. Data requirements 4. Timeline management 5. Quality assurance 6. Risk management 7. Deliverable management",
        rating: 4.4,
        date: "2024-09-06"
    },

    // MIS 431 - Dr. Williams (10 notes)
    {
        id: 51,
        title: "Enterprise Systems Integration",
        class: "MIS 431",
        topic: "Lecture Notes",
        author: "Maria Garcia",
        teacher: "Dr. Williams",
        content: "Dr. Williams covered Enterprise Systems Integration today. Explained system integration patterns: point-to-point, hub-and-spoke, bus architecture. API management: REST vs SOAP, API gateways, rate limiting. Message queuing: publish-subscribe, request-reply patterns. Service-oriented architecture (SOA) principles and benefits. Microservices architecture: decomposition, independence, resilience. Event-driven architecture: event sourcing, CQRS pattern. Integration platforms: MuleSoft, Apache Kafka, enterprise service bus. Lab: Design integration architecture for e-commerce system. Assignment: Create API documentation and integration plan. Midterm covers chapters 1-5. Office hours: Wednesday 1-3pm in Shelby 2009.",
        rating: 4.6,
        date: "2024-09-15"
    },
    {
        id: 52,
        title: "ERP Implementation",
        class: "MIS 431",
        topic: "Project Guidelines",
        author: "David Lee",
        teacher: "Dr. Williams",
        content: "Dr. Williams taught ERP Implementation today. Covered ERP selection criteria: functional requirements, technical requirements, vendor evaluation. Implementation methodology: planning, analysis, design, implementation, testing, deployment. Change management: stakeholder analysis, communication plan, resistance management. Data migration: data mapping, cleansing, validation, cutover strategies. User training: role-based training, hands-on workshops, documentation. Testing strategies: unit testing, integration testing, user acceptance testing. Go-live planning: parallel processing, rollback procedures, support structure. Used SAP and Oracle examples. Lab: Create ERP implementation timeline. Assignment: Develop change management plan. Quiz next week on ERP modules. Office hours: Friday 10am-12pm in Shelby 2009.",
        rating: 4.4,
        date: "2024-09-14"
    },
    {
        id: 53,
        title: "Business Process Management",
        class: "MIS 431",
        topic: "Lecture Notes",
        author: "Lisa Wang",
        teacher: "Dr. Williams",
        content: "BPM concepts: 1. Process modeling 2. Process automation 3. Workflow management 4. Process optimization 5. Business rules 6. Process monitoring 7. Continuous improvement",
        rating: 4.5,
        date: "2024-09-13"
    },
    {
        id: 54,
        title: "Supply Chain Management Systems",
        class: "MIS 431",
        topic: "Study Guide",
        author: "Kevin Park",
        teacher: "Dr. Williams",
        content: "SCM systems: 1. Supply chain visibility 2. Demand planning 3. Inventory management 4. Supplier relationship management 5. Logistics optimization 6. Risk management 7. Performance metrics",
        rating: 4.3,
        date: "2024-09-12"
    },
    {
        id: 55,
        title: "Customer Relationship Management",
        class: "MIS 431",
        topic: "Lecture Notes",
        author: "Rachel Kim",
        teacher: "Dr. Williams",
        content: "CRM systems: 1. Customer data management 2. Sales force automation 3. Marketing automation 4. Customer service 5. Analytics and reporting 6. Mobile CRM 7. Integration strategies",
        rating: 4.7,
        date: "2024-09-11"
    },
    {
        id: 56,
        title: "Enterprise Architecture",
        class: "MIS 431",
        topic: "Project Guidelines",
        author: "Tom Wilson",
        teacher: "Dr. Williams",
        content: "EA frameworks: 1. TOGAF methodology 2. Zachman framework 3. Business architecture 4. Application architecture 5. Data architecture 6. Technology architecture 7. Governance",
        rating: 4.5,
        date: "2024-09-10"
    },
    {
        id: 57,
        title: "Digital Transformation",
        class: "MIS 431",
        topic: "Lecture Notes",
        author: "Sarah Johnson",
        teacher: "Dr. Williams",
        content: "Digital transformation: 1. Digital strategy 2. Technology adoption 3. Change management 4. Data-driven decisions 5. Customer experience 6. Operational efficiency 7. Innovation culture",
        rating: 4.6,
        date: "2024-09-09"
    },
    {
        id: 58,
        title: "Cloud Computing in Enterprise",
        class: "MIS 431",
        topic: "Study Guide",
        author: "Mike Davis",
        teacher: "Dr. Williams",
        content: "Cloud enterprise: 1. Cloud deployment models 2. SaaS applications 3. PaaS platforms 4. IaaS infrastructure 5. Cloud migration 6. Security considerations 7. Cost optimization",
        rating: 4.4,
        date: "2024-09-08"
    },
    {
        id: 59,
        title: "Enterprise Data Management",
        class: "MIS 431",
        topic: "Lecture Notes",
        author: "Emily Chen",
        teacher: "Dr. Williams",
        content: "Data management: 1. Master data management 2. Data governance 3. Data quality 4. Data integration 5. Data security 6. Compliance 7. Data lifecycle management",
        rating: 4.8,
        date: "2024-09-07"
    },
    {
        id: 60,
        title: "IT Governance",
        class: "MIS 431",
        topic: "Project Guidelines",
        author: "Alex Rodriguez",
        teacher: "Dr. Williams",
        content: "IT governance: 1. Governance frameworks 2. IT strategy alignment 3. Risk management 4. Compliance 5. Performance measurement 6. Decision making 7. Stakeholder engagement",
        rating: 4.5,
        date: "2024-09-06"
    },

    // MIS 451 - Dr. Smith (10 notes)
    {
        id: 61,
        title: "Advanced Database Systems",
        class: "MIS 451",
        topic: "Lecture Notes",
        author: "Jordan Smith",
        teacher: "Dr. Smith",
        content: "Dr. Smith covered Advanced Database Systems today. Explained distributed databases: horizontal vs vertical partitioning, data distribution strategies. Database replication: master-slave, master-master, synchronous vs asynchronous. Sharding strategies: range-based, hash-based, directory-based sharding. ACID vs BASE properties: consistency trade-offs. CAP theorem: Consistency, Availability, Partition tolerance trade-offs. Database clustering: active-passive, active-active configurations. High availability: failover mechanisms, load balancing, disaster recovery. Used MongoDB and Cassandra examples. Lab: Set up database replication and test failover. Assignment: Design distributed database architecture. Midterm covers chapters 1-4. Office hours: Monday 2-4pm in Shelby 2011.",
        rating: 4.7,
        date: "2024-09-15"
    },
    {
        id: 62,
        title: "Data Warehousing Advanced",
        class: "MIS 451",
        topic: "Study Guide",
        author: "Taylor Wilson",
        teacher: "Dr. Smith",
        content: "Dr. Smith taught Data Warehousing Advanced today. Covered dimensional modeling: star schema, snowflake schema, fact tables, dimension tables. ETL optimization: parallel processing, incremental loading, error handling. Data vault modeling: hubs, links, satellites, business keys. Real-time data warehousing: streaming data, lambda architecture. Data lakes: structured vs unstructured data, schema-on-read. Cloud data warehouses: Amazon Redshift, Google BigQuery, Snowflake. Performance tuning: indexing strategies, query optimization, partitioning. Lab: Design data warehouse schema for retail company. Assignment: Create ETL process documentation. Quiz next week on dimensional modeling. Office hours: Tuesday 1-3pm in Shelby 2011.",
        rating: 4.5,
        date: "2024-09-14"
    },
    {
        id: 63,
        title: "Big Data Technologies",
        class: "MIS 451",
        topic: "Project Guidelines",
        author: "Chris Brown",
        teacher: "Dr. Smith",
        content: "Big data stack: 1. Hadoop ecosystem 2. Spark processing 3. Kafka streaming 4. Elasticsearch 5. MongoDB 6. Cassandra 7. Data pipeline orchestration",
        rating: 4.6,
        date: "2024-09-13"
    },
    {
        id: 64,
        title: "Machine Learning Operations",
        class: "MIS 451",
        topic: "Lecture Notes",
        author: "Morgan Lee",
        teacher: "Dr. Smith",
        content: "MLOps concepts: 1. Model lifecycle 2. Continuous integration 3. Model deployment 4. Monitoring and maintenance 5. A/B testing 6. Model versioning 7. Infrastructure as code",
        rating: 4.4,
        date: "2024-09-12"
    },
    {
        id: 65,
        title: "Cloud Data Platforms",
        class: "MIS 451",
        topic: "Study Guide",
        author: "Casey White",
        teacher: "Dr. Smith",
        content: "Cloud platforms: 1. AWS data services 2. Azure data platform 3. Google Cloud data 4. Snowflake architecture 5. Databricks platform 6. Data lake formation 7. Serverless analytics",
        rating: 4.3,
        date: "2024-09-11"
    },
    {
        id: 66,
        title: "Real-time Analytics",
        class: "MIS 451",
        topic: "Lecture Notes",
        author: "Riley Green",
        teacher: "Dr. Smith",
        content: "Real-time processing: 1. Stream processing 2. Event-driven architecture 3. Apache Kafka 4. Apache Flink 5. Apache Storm 6. Real-time dashboards 7. Latency optimization",
        rating: 4.7,
        date: "2024-09-10"
    },
    {
        id: 67,
        title: "Data Engineering",
        class: "MIS 451",
        topic: "Project Guidelines",
        author: "Sam Taylor",
        teacher: "Dr. Smith",
        content: "Data engineering: 1. ETL/ELT pipelines 2. Data orchestration 3. Workflow management 4. Data quality frameworks 5. Schema evolution 6. Data lineage 7. Monitoring and alerting",
        rating: 4.5,
        date: "2024-09-09"
    },
    {
        id: 68,
        title: "Advanced Analytics",
        class: "MIS 451",
        topic: "Lecture Notes",
        author: "Jamie Kim",
        teacher: "Dr. Smith",
        content: "Advanced analytics: 1. Deep learning 2. Natural language processing 3. Computer vision 4. Recommendation systems 5. Graph analytics 6. Time series forecasting 7. Anomaly detection",
        rating: 4.6,
        date: "2024-09-08"
    },
    {
        id: 69,
        title: "Data Governance",
        class: "MIS 451",
        topic: "Study Guide",
        author: "Alex Chen",
        teacher: "Dr. Smith",
        content: "Data governance: 1. Data stewardship 2. Data cataloging 3. Metadata management 4. Data privacy 5. Compliance frameworks 6. Data quality standards 7. Governance tools",
        rating: 4.4,
        date: "2024-09-07"
    },
    {
        id: 70,
        title: "Data Science Project Management",
        class: "MIS 451",
        topic: "Project Guidelines",
        author: "Maria Garcia",
        teacher: "Dr. Smith",
        content: "DS project management: 1. Project lifecycle 2. Team roles 3. Methodology selection 4. Tool selection 5. Quality assurance 6. Stakeholder management 7. Success metrics",
        rating: 4.5,
        date: "2024-09-06"
    }
];

// Initialize the application
document.addEventListener('DOMContentLoaded', function() {
    showSection('home');
    displayNotes(notesData);
    setupEventListeners();
    updateAverageRating();
});

// Navigation functionality
function showSection(sectionId) {
    // Hide all sections
    const sections = document.querySelectorAll('section');
    sections.forEach(section => section.classList.remove('active'));
    
    // Show selected section
    document.getElementById(sectionId).classList.add('active');
    
    // Update nav links
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => link.classList.remove('active'));
    
    const activeLink = document.querySelector(`[href="#${sectionId}"]`);
    if (activeLink) activeLink.classList.add('active');
}

// Setup event listeners
function setupEventListeners() {
    // Navigation
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const sectionId = link.getAttribute('href').substring(1);
            showSection(sectionId);
        });
    });

    // Upload form
    document.getElementById('uploadForm').addEventListener('submit', handleUpload);

    // Search and filter
    document.getElementById('searchInput').addEventListener('input', filterNotes);
    document.getElementById('classFilter').addEventListener('change', filterNotes);
    document.getElementById('topicFilter').addEventListener('change', filterNotes);
    document.getElementById('teacherFilter').addEventListener('change', filterNotes);
    document.getElementById('authorFilter').addEventListener('input', filterNotes);
}

// Display notes
function displayNotes(notes) {
    const container = document.getElementById('notesContainer');
    
    if (notes.length === 0) {
        container.innerHTML = '<div class="no-results">No notes found matching your criteria.</div>';
        return;
    }

    container.innerHTML = notes.map(note => `
        <div class="note-card">
            <div class="note-header">
                <div>
                    <div class="note-title">${note.title}</div>
                    <div class="note-meta">
                        <span class="meta-tag">${note.class}</span>
                        <span class="meta-tag topic">${note.topic}</span>
                        <span class="meta-tag teacher">${note.teacher}</span>
                    </div>
                </div>
            </div>
            <div class="note-content" id="content-${note.id}">
                ${note.content.substring(0, 150)}${note.content.length > 150 ? '...' : ''}
            </div>
            ${note.content.length > 150 ? `
                <button class="expand-btn" onclick="toggleExpand(event, ${note.id})">
                    Read More
                </button>
            ` : ''}
            <div class="note-footer">
                <div class="note-author">By: ${note.author}</div>
                <div class="rating-section">
                    <div class="current-rating">
                        <span class="rating-label">Current: </span>
                        <span class="rating-stars">${generateStars(note.rating, note.id, false)}</span>
                        <span class="rating-text">(${note.rating.toFixed(1)})</span>
                    </div>
                    <div class="add-rating">
                        <span class="rating-label">Add Rating: </span>
                        <div class="rating" data-note-id="${note.id}">
                            ${generateStars(0, note.id, true)}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `).join('');
}

// Generate star rating
function generateStars(rating, noteId, isClickable) {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;
    let stars = '';

    for (let i = 1; i <= 5; i++) {
        if (i <= fullStars) {
            if (isClickable) {
                stars += `<span class="star active" onclick="addRating(${noteId}, ${i})">★</span>`;
            } else {
                stars += `<span class="star active">★</span>`;
            }
        } else if (i === fullStars + 1 && hasHalfStar) {
            if (isClickable) {
                stars += `<span class="star active" onclick="addRating(${noteId}, ${i})">★</span>`;
            } else {
                stars += `<span class="star active">★</span>`;
            }
        } else {
            if (isClickable) {
                stars += `<span class="star" onclick="addRating(${noteId}, ${i})">★</span>`;
            } else {
                stars += `<span class="star">★</span>`;
            }
        }
    }
    return stars;
}

// Toggle expand/collapse note content
function toggleExpand(event, noteId) {
    const contentElement = document.getElementById(`content-${noteId}`);
    const note = notesData.find(n => n.id === noteId);
    const button = event.target;

    if (contentElement.classList.contains('expanded')) {
        contentElement.innerHTML = note.content.substring(0, 150) + '...';
        contentElement.classList.remove('expanded');
        button.textContent = 'Read More';
    } else {
        contentElement.innerHTML = note.content;
        contentElement.classList.add('expanded');
        button.textContent = 'Read Less';
    }
}

// Add a user rating to a note
function addRating(noteId, rating) {
    const note = notesData.find(n => n.id === noteId);
    if (note) {
        // Store user rating
        userRatings[noteId] = rating;
        
        // Calculate new average rating
        const existingRating = note.rating;
        const userRating = rating;
        const newAverage = (existingRating + userRating) / 2;
        note.rating = newAverage;
        
        updateAverageRating();
        displayNotes(filterNotesData());
        
        // Show confirmation
        alert(`Thank you for rating this note ${rating} stars! Roll Tide!`);
    }
}

// Calculate and update average rating
function updateAverageRating() {
    if (notesData.length === 0) return;
    
    const totalRating = notesData.reduce((sum, note) => sum + note.rating, 0);
    const averageRating = (totalRating / notesData.length).toFixed(1);
    
    // Update the stat card with new average
    const statNumber = document.querySelector('.stat-number');
    if (statNumber && statNumber.textContent.includes('★')) {
        statNumber.textContent = `${averageRating}★`;
    }
}

// Handle note upload
function handleUpload(e) {
    e.preventDefault();
    
    const newNote = {
        id: notesData.length + 1,
        title: document.getElementById('noteTitle').value,
        class: document.getElementById('noteClass').value,
        topic: document.getElementById('noteTopic').value,
        author: document.getElementById('noteAuthor').value,
        teacher: document.getElementById('noteTeacher').value,
        content: document.getElementById('noteContent').value,
        rating: 0,
        date: new Date().toISOString().split('T')[0]
    };

    notesData.push(newNote);
    
    // Reset form
    e.target.reset();
    
    // Update average rating
    updateAverageRating();
    
    // Show success message
    alert('Note uploaded successfully! Roll Tide!');
    
    // Switch to browse section
    showSection('browse');
    displayNotes(notesData);
}

// Search functionality
function searchNotes() {
    filterNotes();
}

// Filter notes based on search criteria
function filterNotes() {
    const filteredNotes = filterNotesData();
    displayNotes(filteredNotes);
}

function filterNotesData() {
    const searchTerm = document.getElementById('searchInput').value.toLowerCase();
    const classFilter = document.getElementById('classFilter').value;
    const topicFilter = document.getElementById('topicFilter').value;
    const teacherFilter = document.getElementById('teacherFilter').value;
    const authorFilter = document.getElementById('authorFilter').value.toLowerCase();

    return notesData.filter(note => {
        const matchesSearch = !searchTerm || 
            note.title.toLowerCase().includes(searchTerm) ||
            note.content.toLowerCase().includes(searchTerm);
        
        const matchesClass = !classFilter || note.class === classFilter;
        const matchesTopic = !topicFilter || note.topic === topicFilter;
        const matchesTeacher = !teacherFilter || note.teacher === teacherFilter;
        const matchesAuthor = !authorFilter || note.author.toLowerCase().includes(authorFilter);

        return matchesSearch && matchesClass && matchesTopic && matchesTeacher && matchesAuthor;
    });
}

// Initialize with home section visible
window.addEventListener('load', () => {
    showSection('home');
});