# 💰 Seu Bolso

**Seu Bolso** é um sistema web desenvolvido para ajudar usuários a **organizar suas finanças pessoais**, permitindo o **controle de receitas, despesas, metas financeiras e lista de desejos**.  
O projeto foi desenvolvido como parte do **Programa Jovem Programador** utilizando **Java, JSP, Servlets e MySQL**.

---

## 🚀 Funcionalidades Principais

- 🔐 **Autenticação de Usuário** (login e cadastro)
- 👤 **Perfil do Usuário**
  - Foto de perfil (armazenada em Base64)
  - Objetivo financeiro e valor economizado
- 💸 **Lançamentos Financeiros**
  - Registro de receitas e despesas
  - Controle de despesas fixas e vencimentos
  - Categorização e descrição detalhada
- 📅 **Calendário Financeiro**
  - Visualização de vencimentos e lançamentos do mês
- 🧾 **Relatórios Financeiros**
  - Filtros por data, tipo e categoria
- 🎯 **Lista de Desejos**
  - Itens desejados com valor objetivo e valor atual
  - Link e imagem em Base64
- 📊 **Dashboard Resumo**
  - Visão geral de entradas, saídas e progresso financeiro

---

## 🧱 Tecnologias Utilizadas

- **Java (Servlets e JSP)**
- **HTML5, CSS3, JavaScript**
- **Bootstrap 5**
- **MySQL**
- **JDBC**
- **Tomcat 10+**
- **Eclipse IDE**

---

## 🗄️ Estrutura do Banco de Dados (MySQL)

```sql
CREATE DATABASE seubolso_db CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE seubolso_db;

-- Usuários
CREATE TABLE usuarios (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    senha VARCHAR(255) NOT NULL,
    foto_perfil LONGTEXT COMMENT 'Imagem do perfil em base64',
    objetivo_financeiro DECIMAL(10, 2) DEFAULT 0.00 COMMENT 'Meta financeira do usuário',
    valor_guardado DECIMAL(10, 2) DEFAULT 0.00 COMMENT 'Valor já economizado pelo usuário',
    data_criacao TIMESTAMP DEFAULT CURRENT_TIMESTAMP COMMENT 'Data de criação da conta'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Lista de Desejos
CREATE TABLE lista_desejos (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    descricao VARCHAR(255) NOT NULL,
    valor_objetivo DECIMAL(10, 2) NOT NULL,
    valor_atual DECIMAL(10, 2) DEFAULT 0.00,
    link VARCHAR(500),
    imagem_base64 LONGTEXT,
    usuario_id BIGINT NOT NULL,
    data_criacao TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (usuario_id) REFERENCES usuarios(id) ON DELETE CASCADE
);

CREATE INDEX idx_usuario_id ON lista_desejos(usuario_id);

-- Lançamentos (Receitas e Despesas)
CREATE TABLE lancamentos (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    titulo VARCHAR(100) NOT NULL,
    valor DOUBLE NOT NULL,
    categoria VARCHAR(50),
    data DATE NOT NULL,
    formaPagamento VARCHAR(50),
    descricao VARCHAR(500),
    tipo ENUM('receita','despesa') NOT NULL,
    despesaFixa BOOLEAN DEFAULT FALSE,
    vencimento DATE,
    usuario_id BIGINT NOT NULL,
    FOREIGN KEY (usuario_id) REFERENCES usuarios(id) ON DELETE CASCADE
);
```
## 👥 Participantes do Grupo

- **Rafael**  
  https://github.com/rafael2297

- **Hayanne**  
  https://github.com/AdryelleLima

- **Júlia**  
  https://github.com/JuliaLimaB007
