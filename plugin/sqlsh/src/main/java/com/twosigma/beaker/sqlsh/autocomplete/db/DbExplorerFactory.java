package com.twosigma.beaker.sqlsh.autocomplete.db;

import java.io.IOException;

import javax.sql.DataSource;

import com.twosigma.beaker.NamespaceClient;
import com.twosigma.beaker.sqlsh.utils.BeakerParser;
import com.twosigma.beaker.sqlsh.utils.DBConnectionException;
import com.twosigma.beaker.sqlsh.utils.JDBCClient;

public class DbExplorerFactory {
	
	private static final String VENDOR_JDBC_MYSQL = "jdbc:mysql:";
//	private static final String VENDOR_JDBC_ORACLE = "jdbc:oracle:";
//	private static final String VENDOR_JDBC_MSSQL = "jdbc:sqlserver:";

	public static DbInfo getDbInfo(String txt, JDBCClient jdbcClient, String sessionId) {
		
		final NamespaceClient namespaceClient = NamespaceClient.getBeaker(sessionId);
		final BeakerParser beakerParser;
		try {
			beakerParser = new BeakerParser(txt, namespaceClient);
			
			final String uri = beakerParser.getDbURI();
			
			if (uri != null) {
				final DataSource ds = jdbcClient.getDataSource(uri);

				if (uri.startsWith(VENDOR_JDBC_MYSQL)) {
					return new MysqlDbExplorer(ds);
				}
			}

		} catch (IOException e) {
			e.printStackTrace();
		} catch (DBConnectionException e) {
			e.printStackTrace();
		}	

		return null;
	}

}
